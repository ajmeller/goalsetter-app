import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from '../models/stats.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;

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
