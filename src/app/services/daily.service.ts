import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'localhost:3000';

  getDailyEntry(userId: string, date: string): Observable<any>  {
    return this.http.get(`${this.apiUrl}/${userId}/${date}`);
  }

  updateDailyEntry(date: string, completed: boolean, comment: string, userId: string): Observable<any>  {
    return this.http.post(`${this.apiUrl}/update`, {date: date, completed: completed, comment: comment, userId: userId});
  }
}
