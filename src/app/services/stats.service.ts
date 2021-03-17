import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from '../models/stats.interface';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:3000';
  stats: Stats = {
    firstEntry: new Date(),
    daysCompleted: 0,
    percentageCompleted: 0,
    moodCount: { happy: 0, medium: 0, sad: 0 },
  };

  getStats(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/stats/${userId}`);
  }
}
