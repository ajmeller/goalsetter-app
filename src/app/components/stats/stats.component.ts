import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  constructor(
    private dailyService: DailyService,
    private authService: AuthService
  ) {}

  stats = {
    firstEntry: new Date(),
    daysTotal: 0,
    percentageComplete: 0,
    longestStreak: 0,
    averageMood: '',
  };

  getStats() {}

  ngOnInit(): void {}
}
