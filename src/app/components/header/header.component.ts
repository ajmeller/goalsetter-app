import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DailyService } from 'src/app/services/daily.service';
import { format, add } from 'date-fns';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isShow: boolean = false;
  user: User = { uid: '', displayName: '' };
  datesVisible: string[] = [];
  userLoggedIn: boolean = false;
  screenWidth: number = 0;
  datesRaw: Date[] = [];

  constructor(
    private dailyService: DailyService,
    private authService: AuthService,
    private router: Router
  ) {
    authService.getIsLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.userLoggedIn = isLoggedIn;
      this.user = this.authService.user;
      this.getVisibleDays();
    });

    dailyService.getNewDate.subscribe((newDate: any) => {
      const date = add(new Date(newDate), { days: 1 });
      this.getVisibleDays(date);
    });

    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  get dates(): string[] {
    return this.dailyService.dates;
  }

  get showPreviousButton() {
    if (this.datesVisible[0] === this.dates[0]) {
      return false;
    }
    return true;
  }

  get showNextButton() {
    if (
      this.datesVisible[this.datesVisible.length - 1] ===
      this.dates[this.dates.length - 1]
    ) {
      return false;
    }
    return true;
  }

  toggleMenu() {
    this.isShow = !this.isShow;
  }

  getVisibleDays(dateSelected?: Date) {
    this.dailyService.getEntryDates(this.user.uid).subscribe((data: any) => {
      data.forEach((dateEntry: any) => {
        const date = add(new Date(dateEntry.date), { days: 1 });
        const datePretty = format(date, 'M-d-yyyy');
        this.datesRaw.push(date);
        this.dailyService.dates.push(datePretty);
      });

      this.datesVisible = [];
      let currentDate: Date;
      const datesLen = this.datesRaw.length;
      if (!dateSelected) {
        currentDate = this.datesRaw[datesLen - 1];
      } else {
        currentDate = new Date(dateSelected);
      }
      if (currentDate) {
        const dateFormatted = format(currentDate, 'M-d-yyyy');
        const datePos = this.dates.indexOf(dateFormatted);
        if (datePos < 0) {
          this.datesVisible = this.dates.slice(datesLen - 3, datesLen + 2);
        }
        if (datesLen > 3) {
          if (datePos === 0) {
            this.datesVisible = this.dates.slice(0, 3);
          } else if (datePos === datesLen - 1) {
            this.datesVisible = this.dates.slice(datePos - 2, datePos + 1);
          } else {
            this.datesVisible = this.dates.slice(datePos - 1, datePos + 2);
          }
        } else {
          this.datesVisible = this.dates;
        }
      }
    });
  }

  goToDate(dateSelected: string) {
    const date = format(new Date(dateSelected), 'yyyy-MM-dd');
    this.router.navigate([`/daily/${date}`]);
  }

  showMoreDates(previous: boolean) {
    const currentPos = this.dates.indexOf(this.datesVisible[1]);
    if (previous) {
      this.getVisibleDays(new Date(this.dates[currentPos - 1]));
    } else {
      this.getVisibleDays(new Date(this.dates[currentPos + 1]));
    }
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.getVisibleDays();
  }
}
