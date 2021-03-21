import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { DailyService } from '../services/daily.service';

@Injectable({
  providedIn: 'root',
})
export class TodayGuard implements CanActivate {
  hasSubmittedToday: boolean = false;
  today: string = format(new Date(), 'yyyy-MM-dd');

  constructor(private dailyService: DailyService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.dailyService.hasSubmittedToday.subscribe(
      (hasSubmittedToday: boolean) => {
        if (hasSubmittedToday) {
          this.hasSubmittedToday = hasSubmittedToday;
          this.router.navigate([`/daily/${this.today}`]);
          return false;
        }
        return true;
      }
    );
    if (this.hasSubmittedToday) {
      this.router.navigate([`/daily/${this.today}`]);
      return false;
    }

    return true;
  }
}
