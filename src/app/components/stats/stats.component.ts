import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Stats } from 'src/app/models/stats.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  constructor(
    private statsService: StatsService,
    private authService: AuthService
  ) {}

  get stats(): Stats {
    return this.statsService.stats;
  }

  get datePretty(): string {
    return format(new Date(this.stats.firstEntry), 'M-d-yyyy');
  }

  get percent(): string {
    const percent: string = (this.stats.percentageCompleted * 100).toFixed(0);
    return percent + '%';
  }

  getStats() {
    this.statsService
      .getStats(this.authService.user.uid)
      .subscribe((data: any) => {
        this.statsService.stats = {
          firstEntry: data.firstEntry,
          daysCompleted: data.daysTotal,
          percentageCompleted: data.percentageComplete,
          moodCount: {
            happy: data.moodCount.happy,
            medium: data.moodCount.medium,
            sad: data.moodCount.sad,
          },
        };
      });
  }

  ngOnInit(): void {
    this.getStats();
  }
}
