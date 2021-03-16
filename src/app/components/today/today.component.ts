import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { User } from 'src/app/models/user.interface';
import * as moment from 'moment';
import { DailyEntry } from 'src/app/models/daily-entry.interface';
import { Router } from '@angular/router';
import { GoalService } from 'src/app/services/goal.service';
import { Goal } from 'src/app/models/goal.interface';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dailyService: DailyService,
    private quotesService: QuotesService,
    private goalService: GoalService,
    private router: Router
  ) {}

  quote: Quote = { quote: '', author: '' };
  welcomeDate: string = moment(new Date()).format('ddd. MMMM Do, YYYY');
  today: string = moment(new Date()).format('YYYY-MM-DD');
  mood: string = '';
  comment: string = '';
  editGoalMode: boolean = false;
  newGoal: string = '';

  get user(): User {
    return this.authService.user;
  }

  get dailyEntry(): DailyEntry {
    return this.dailyService.dailyEntry;
  }

  get goal(): Goal {
    return this.goalService.goal;
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

        if (
          this.dailyEntry &&
          moment(this.dailyEntry.date).format('YYYY-MM-DD') === this.today &&
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
      this.router.navigate([`/daily/${this.today}`]);
    }
  }

  getGoal() {
    this.goalService.getGoals(this.user.uid).subscribe((data: any) => {
      const currentGoal = data.find((o: any) => o.is_current);
      this.goalService.goal = {
        goalId: currentGoal.goal_id,
        goalDescription: currentGoal.goal_description,
      };
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
    this.setQuote();
    this.getGoal();
    this.getEntryForToday();
    //BUG: runs before login complete
  }
}
