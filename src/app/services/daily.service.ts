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
    dailyId: 0,
    date: new Date(),
    completed: false,
    comment: '',
    mood: '',
    goal: { goalId: 0, goalDescription: '' },
  };
  dailyEntries: DailyEntry[] = [];

  getDailyEntry(userId: string, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/${userId}/${date}`);
  }

  getEntryDates(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/dates/${userId}`);
  }

  getAllEntries(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/history/${userId}`);
  }

  saveEntryForToday(
    date: string,
    completed: boolean,
    comment: string,
    userId: string,
    mood: string,
    goalId: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/daily/today/add`, {
      date: date,
      completed: completed,
      comment: comment,
      userId: userId,
      mood: mood,
      goalId: goalId,
    });
  }

  setDailyEntry(daily: any) {
    this.dailyEntry = {
      dailyId: daily.day_id,
      date: daily.date,
      completed: daily.completed,
      comment: daily.comment,
      mood: daily.mood,
      goal: {
        goalId: daily.goal_id,
        goalDescription: daily.goal_description,
      },
    };
  }
}
