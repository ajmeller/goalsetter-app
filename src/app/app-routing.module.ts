import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodayComponent } from './components/today/today.component';
import { LoginComponent } from './components/login/login.component';
import { PreviousDayComponent } from './components/previous-day/previous-day.component';
import { StatsComponent } from './components/stats/stats.component';
import { AllDaysComponent } from './components/all-days/all-days.component';

const routes: Routes = [
  { path: 'today', component: TodayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'daily/:date', component: PreviousDayComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'history', component: AllDaysComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
