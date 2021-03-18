import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { User } from 'src/app/models/user.interface';
import { DailyEntry } from 'src/app/models/daily-entry.interface';
import { Router } from '@angular/router';
import { GoalService } from 'src/app/services/goal.service';
import { Goal } from 'src/app/models/goal.interface';
import { format, add } from 'date-fns';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  userLoggedIn: boolean = false;
  quote: Quote = { quote: '', author: '' };
  welcomeDate: string = format(new Date(), 'EEE. MMMM do, yyyy');
  today: string = format(new Date(), 'yyyy-MM-dd');
  mood: string = '';
  comment: string = '';
  editGoalMode: boolean = false;
  newGoal: string = '';
  timeOfDay: string = '';

  constructor(
    private authService: AuthService,
    private dailyService: DailyService,
    private quotesService: QuotesService,
    private goalService: GoalService,
    private router: Router
  ) {
    authService.getIsLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.userLoggedIn = isLoggedIn;
      if (this.userLoggedIn) {
        this.getTimeOfDay();
        this.setQuote();
        this.getEntryForToday();

        if (this.newGoal == '') {
          this.getGoal();
        }
      }
    });
  }

  get user(): User {
    return this.authService.user;
  }

  get dailyEntry(): DailyEntry {
    return this.dailyService.dailyEntry;
  }

  get goal(): Goal {
    return this.goalService.goal;
  }

  getTimeOfDay() {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour < 12) {
      this.timeOfDay = 'morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      this.timeOfDay = 'afternoon';
    } else if (currentHour >= 17) {
      this.timeOfDay = 'evening';
    }
  }

  setQuote() {
    this.quotesService.getQuote().subscribe((data) => {
      const quoteData = data.contents.quotes[0];
      const quote: Quote = {
        quote: quoteData.quote,
        author: quoteData.author,
      };
      this.quote = quote;
    });
  }

  selectMood(event: any) {
    this.mood = event.target.id;
  }

  getEntryForToday() {
    this.dailyService
      .getDailyEntry(this.user.uid, this.today)
      .subscribe((data: any) => {
        if (data.length > 0) {
          const daily = data[0];
          this.dailyService.setDailyEntry(daily);
        }

        const date = add(new Date(this.dailyEntry.date), { days: 1 });

        if (
          this.dailyEntry &&
          format(date, 'yyyy-MM-dd') === this.today &&
          this.dailyEntry.completed
        ) {
          this.router.navigate([`/daily/${this.today}`]);
        }
      });
  }

  saveDailyEntry() {
    if (this.user.uid && this.goal.goalId) {
      this.dailyService
        .saveEntryForToday(
          this.today,
          true,
          this.comment,
          this.user.uid,
          this.mood,
          this.goal.goalId
        )
        .subscribe((data: any) => {});
      this.dailyService
        .getDailyEntry(this.user.uid, this.today)
        .subscribe((data: any) => {
          this.dailyService.newEntrySaved.emit(true);
        });
      this.router.navigate([`/daily/${this.today}`]);
    }
  }

  getGoal() {
    this.goalService.getGoals(this.user.uid).subscribe((data: any) => {
      const currentGoal = data.find((o: any) => o.is_current);
      if (currentGoal) {
        this.goalService.goal = {
          goalId: currentGoal.goal_id,
          goalDescription: currentGoal.goal_description,
        };

        this.newGoal = this.goal.goalDescription;
      } else {
        const firstGoal = window.prompt('Please Enter Goal');
        if (firstGoal) {
          this.goalService
            .saveNewGoal(firstGoal, this.user.uid)
            .subscribe((data: any) => {
              return null;
            });
          this.newGoal = firstGoal;
          this.goalService.goal.goalDescription = firstGoal;
        }
      }
    });
  }

  toggleEditGoalMode() {
    this.editGoalMode = !this.editGoalMode;
  }

  saveNewGoal() {
    this.goalService
      .saveNewGoal(this.newGoal, this.user.uid)
      .subscribe((data: any) => {
        return null;
      });

    this.getGoal();
    this.editGoalMode = !this.editGoalMode;
  }

  ngOnInit(): void {
    if (this.userLoggedIn) {
      this.getTimeOfDay();
      this.setQuote();
      this.getEntryForToday();

      if (this.newGoal == '') {
        this.getGoal();
      }
    }
  }
}
