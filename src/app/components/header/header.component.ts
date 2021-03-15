import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dailyService: DailyService,
    private authService: AuthService
  ) {}

  isShow: boolean = true;
  user: User = { uid: '', displayName: '' };
  dates: string[] = [];

  toggleDays() {
    this.isShow = !this.isShow;
  }

  getDays() {
    this.dailyService.getAllEntries(this.user.uid).subscribe((data: any) => {
      data.forEach((dateEntry: any) => {
        const datePretty = moment(dateEntry.date).format('MM-DD-YYYY');
        this.dates.push(datePretty);
      });
    });
  }

  goToDate(date: string) {
    this.dailyService.getDailyEntry(this.user.uid, date).subscribe((data) => {
      console.log(data);
    });
  }

  signOut() {
    return this.authService.signOut();
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.getDays();
  }
}
