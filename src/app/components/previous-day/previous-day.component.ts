import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DailyEntry } from 'src/app/models/daily-entry.interface';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';

@Component({
  selector: 'app-previous-day',
  templateUrl: './previous-day.component.html',
  styleUrls: ['./previous-day.component.css'],
})
export class PreviousDayComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dailyService: DailyService
  ) {}

  isShow = true;
  user: User = { uid: '', displayName: '' };

  toggleDays() {
    this.isShow = !this.isShow;
  }

  get dailyEntry(): DailyEntry {
    return this.dailyService.dailyEntry;
  }

  /*   set dailyEntry(entry: DailyEntry) {
    this.entry = entry;
  } */

  getDailyEntry() {
    return (
      this.dailyService
        //.getDailyEntry(this.user.uid, '2021-03-10')
        .getDailyEntry('A61s04wNOBPbgrQUEvPaZGLIlvy2', '2021-03-10')
        .subscribe((data: any) => {
          const daily = data[0];
          this.dailyService.dailyEntry = {
            date: daily.date,
            completed: daily.completed,
            comment: daily.comment,
            datePretty: moment(daily.date).format('ddd. MMMM Do, YYYY'),
            mood: daily.mood,
          };

          console.log(this.dailyEntry);
        })
    );
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.getDailyEntry();
  }
}
