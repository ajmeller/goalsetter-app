import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'localhost:3000';

  getDailyEntry(userId: string, date: Date) {
    return this.http.get(`/${userId}/${date}`);
  }
}
