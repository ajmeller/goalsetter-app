import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { User } from 'src/app/models/user.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dailyService: DailyService,
    private quotesService: QuotesService
  ) {}

  quote: Quote = { quote: '', author: '' };
  today: string = moment(new Date()).format('ddd. MMMM Do, YYYY');
  mood: string = '';
  comment: string = '';

  get user(): User {
    return this.authService.user;
  }

  getQuote() {
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

  saveDailyEntry() {
    const date = moment(new Date()).format('YYYY-MM-DD');
    this.dailyService
      .updateDailyEntry(date, true, this.comment, this.user.uid, this.mood)
      .subscribe(() => {
        return null;
      });
  }

  ngOnInit(): void {
    this.getQuote();
  }
}
