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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GoalDialogComponent } from '../goal-dialog/goal-dialog.component';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  //userLoggedIn: boolean = false;
  quote: Quote = { quote: '', author: '' };
  welcomeDate: string = format(new Date(), 'EEE. MMMM do, yyyy');
  today: string = format(new Date(), 'yyyy-MM-dd');
  mood: string = '';
  comment: string = '';
  editGoalMode: boolean = false;
  newGoal: string = '';
  timeOfDay: string = '';
  selected: boolean = false;

  get userLoggedIn(): boolean {
    return this.authService.isLoggedIn;
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

  constructor(
    private authService: AuthService,
    private dailyService: DailyService,
    private quotesService: QuotesService,
    private goalService: GoalService,
    private router: Router,
    private dialog: MatDialog
  ) {
    authService.getIsLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.getTimeOfDay();
        this.setQuote();
        this.getEntryForToday();

        if (this.newGoal == '') {
          this.getGoal();
        }
      }
    });
  }

  openGoalDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.minHeight = 240;
    dialogConfig.minWidth = 320;

    const dialogRef = this.dialog.open(GoalDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.goalService
        .saveNewGoal(result.goal, this.user.uid)
        .subscribe((data: any) => {});
      setTimeout(() => {
        this.getGoal();
      }, 500);
    });
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
          const date = add(new Date(daily.date), { days: 1 });
          if (format(date, 'yyyy-MM-dd') === this.today && daily.completed) {
            this.dailyService.hasSubmittedToday.emit(true);
          }
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
      setTimeout(() => {
        this.router.navigate([`/daily/${this.today}`]);
      }, 500);
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
        this.openGoalDialog();
      }
    });
  }

  toggleEditGoalMode() {
    this.editGoalMode = !this.editGoalMode;
  }

  saveNewGoal() {
    this.editGoalMode = !this.editGoalMode;

    this.goalService
      .saveNewGoal(this.newGoal, this.user.uid)
      .subscribe((data: any) => {});
    setTimeout(() => {
      this.getGoal();
    }, 500);
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
