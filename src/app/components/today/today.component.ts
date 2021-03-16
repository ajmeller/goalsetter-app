import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { User } from 'src/app/models/user.interface';
import * as moment from 'moment';
import { DailyEntry } from 'src/app/models/daily-entry.interface';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  quote: Quote = { quote: '', author: '' };
  welcomeDate: string = moment(new Date()).format('ddd. MMMM Do, YYYY');
  today: string = moment(new Date()).format('YYYY-MM-DD');
  mood: string = '';
  comment: string = '';

  get user(): User {
    return this.authService.user;
  }

  get dailyEntry(): DailyEntry {
    return this.dailyService.dailyEntry;
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
          this.dailyService.dailyEntry = {
            date: daily.date,
            completed: daily.completed,
            comment: daily.comment,
            mood: daily.mood,
          };
        }

        if (
          this.dailyEntry &&
          moment(this.dailyEntry.date).format('YYYY-MM-DD') === this.today &&
          this.dailyEntry.completed
        ) {
          this.router.navigate([this.today]);
        }
      });
  }

  saveDailyEntry() {
    this.dailyService
      .saveEntryForToday(
        this.today,
        true,
        this.comment,
        this.user.uid,
        this.mood
      )
      .subscribe(() => {});
    this.router.navigate([this.today]);
  }

  ngOnInit(): void {
    this.setQuote();
    this.getEntryForToday();
    //BUG: runs before login complete
  }
}
