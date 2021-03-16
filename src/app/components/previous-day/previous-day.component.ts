import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DailyEntry } from 'src/app/models/daily-entry.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';

@Component({
  selector: 'app-previous-day',
  templateUrl: './previous-day.component.html',
  styleUrls: ['./previous-day.component.css'],
})
export class PreviousDayComponent implements OnInit {
  constructor(
    private dailyService: DailyService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  datePretty: string = '';

  get dailyEntry(): DailyEntry {
    return this.dailyService.dailyEntry;
  }

  getDailyEntry() {
    this.route.params.subscribe((params) => {
      this.dailyService
        .getDailyEntry(this.authService.user.uid, params['date'])
        .subscribe((data: any) => {
          if (data.length > 0) {
            const daily = data[0];

            this.dailyService.dailyEntry = {
              date: daily.date,
              completed: daily.completed,
              comment: daily.comment,
              mood: daily.mood,
            };
          }
          this.datePretty = moment(params['date']).format('ddd. MMMM Do, YYYY');
        });
    });
  }

  ngOnInit(): void {
    this.getDailyEntry();
  }
}
