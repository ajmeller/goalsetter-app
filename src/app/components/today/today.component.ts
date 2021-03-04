import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes.service';
import { Quote } from 'src/app/models/quote.interface';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  constructor(private quotesService: QuotesService) {}

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

  ngOnInit(): void {
    this.getQuote();
  }
}
