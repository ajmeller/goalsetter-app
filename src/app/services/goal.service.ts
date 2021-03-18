import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  goal: Goal = { goalId: 0, goalDescription: '' };

  getGoals(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/goals/${userId}`);
  }

  saveNewGoal(goalDesc: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/goals/new`, {
      goal: goalDesc,
      userId: userId,
    });
  }
}
