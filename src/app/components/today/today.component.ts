import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote.interface';
import { QuotesService } from 'src/app/services/quotes.service';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})

export class TodayComponent implements OnInit {
  constructor(
    private quotesService: QuotesService,
    private authService: AuthService,
    private dailyService: DailyService
  ) {}

  quote: Quote = { quote: '', author: '' };

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

  getDailyEntry(){
    return this.dailyService.getDailyEntry('A61s04wNOBPbgrQUEvPaZGLIlvy2', '2021-03-10').subscribe((data: any) => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.getQuote();
    this.getDailyEntry()
  }
}
