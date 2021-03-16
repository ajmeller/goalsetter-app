import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isShow: boolean = true;
  user: User = { uid: '', displayName: '' };
  dates: string[] = [];
  datesVisible: string[] = [];

  toggleDays() {
    this.isShow = !this.isShow;
  }

  getDays() {
    this.dates = [];

    this.dailyService.getAllEntries(this.user.uid).subscribe((data: any) => {
      data.forEach((dateEntry: any) => {
        const datePretty = moment(dateEntry.date).format('MM-DD-YYYY');
        this.dates.push(datePretty);
      });

      this.route.params.subscribe((params) => {
        let dateSelected = params['date'];
        const datesLen = this.dates.length;
        const dateFormatted = moment(dateSelected).format('MM-DD-YYYY');
        const datePos = this.dates.indexOf(dateFormatted);

        if (!dateSelected || datePos < 0) {
          this.dates = this.dates.slice(datesLen - 3, datesLen + 2);
        } else if (datesLen > 3) {
          if (datePos === 0) {
            this.dates = this.dates.slice(0, 3);
          } else if (datePos === datesLen - 1) {
            this.dates = this.dates.slice(datePos - 2, datePos + 1);
          } else {
            this.dates = this.dates.slice(datePos - 1, datePos + 2);
          }
        }
      });
    });
  }

  goToDate(dateSelected: string) {
    const date = moment(dateSelected).format('YYYY-MM-DD');
    this.router.navigate([date]);
    this.getDays();
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.getDays();
  }
}
