import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'https://quotes.rest/qod?string=inspire';

  getQuote(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
