import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';
import { format, add } from 'date-fns';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isShow: boolean = false;
  user: User = { uid: '', displayName: '' };
  dates: string[] = [];
  datesVisible: string[] = [];
  userLoggedIn: boolean = false;

  constructor(
    private dailyService: DailyService,
    private authService: AuthService,
    private router: Router
  ) {
    authService.getIsLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.userLoggedIn = isLoggedIn;
      this.getDays();
    });

    dailyService.getNewDate.subscribe((newDate: any) => {
      this.getDays(newDate);
    });
  }

  toggleDays() {
    this.isShow = !this.isShow;
  }

  getDays(dateSelected?: string) {
    this.dates = [];

    this.dailyService.getEntryDates(this.user.uid).subscribe((data: any) => {
      data.forEach((dateEntry: any) => {
        const date = add(new Date(dateEntry.date), { days: 1 });
        const datePretty = format(date, 'M-d-yyyy');
        this.dates.push(datePretty);
      });

      const datesLen = this.dates.length;

      if (!dateSelected) {
        this.dates = this.dates.slice(datesLen - 3, datesLen + 2);
      } else {
        const date = add(new Date(dateSelected), { days: 1 });
        const dateFormatted = format(date, 'M-d-yyyy');
        const datePos = this.dates.indexOf(dateFormatted);
        if (datePos < 0) {
          this.dates = this.dates.slice(datesLen - 3, datesLen + 2);
        }
        if (datesLen > 3) {
          if (datePos === 0) {
            this.dates = this.dates.slice(0, 3);
          } else if (datePos === datesLen - 1) {
            this.dates = this.dates.slice(datePos - 2, datePos + 1);
          } else {
            this.dates = this.dates.slice(datePos - 1, datePos + 2);
          }
        }
      }
    });
  }

  goToDate(dateSelected: string) {
    const date = format(new Date(dateSelected), 'yyyy-MM-dd');
    this.router.navigate([`/daily/${date}`]);
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.getDays();
  }
}
