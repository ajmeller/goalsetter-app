import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyEntry } from '../models/daily-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:3000';
  dailyEntry: DailyEntry = {
    date: new Date(),
    completed: false,
    comment: '',
    mood: '',
  };

  getDailyEntry(userId: string, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/${date}`);
  }

  getAllEntries(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  saveEntryForToday(
    date: string,
    completed: boolean,
    comment: string,
    userId: string,
    mood: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, {
      date: date,
      completed: completed,
      comment: comment,
      userId: userId,
      mood: mood,
    });
  }
}
