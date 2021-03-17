import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  /*   @Input() dailyEntry: DailyEntry = {
    dailyId: 0,
    date: new Date(),
    completed: false,
    comment: '',
    mood: '',
    goal: {
      goalId: 0,
      goalDescription: '',
    },
  }; */

  get dailyEntry(): DailyEntry {
    return this.dailyService.dailyEntry;
  }

  getDailyEntry() {
    this.route.params.subscribe((params) => {
      if (params && Object.keys(params).length > 0) {
        const dateParam = params['date'];
        this.datePretty = moment(dateParam).format('ddd. MMMM Do, YYYY');
        this.dailyService.getNewDate.emit(dateParam);
        this.dailyService
          .getDailyEntry(this.authService.user.uid, dateParam)
          .subscribe((data: any) => {
            if (data.length > 0) {
              const daily = data[0];
              this.dailyService.setDailyEntry(daily);
            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.getDailyEntry();
  }
}
