import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';

@Component({
  selector: 'app-all-days',
  templateUrl: './all-days.component.html',
  styleUrls: ['./all-days.component.css'],
})
export class AllDaysComponent implements OnInit {
  constructor(
    private dailyService: DailyService,
    private authService: AuthService
  ) {}

  get dailyEntries() {
    return this.dailyService.dailyEntries;
  }

  getHistory() {
    this.dailyService
      .getAllEntries(this.authService.user.uid)
      .subscribe((data: any) => {
        data.forEach((entry: any) => {
          this.dailyService.setDailyEntry(entry);
          const dailyEntry = this.dailyService.dailyEntry;
          this.dailyService.dailyEntries.push(dailyEntry);
        });
      });
  }

  ngOnInit(): void {
    this.getHistory();
  }
}
