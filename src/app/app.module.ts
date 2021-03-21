import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TodayComponent } from './components/today/today.component';
import { LoginComponent } from './components/login/login.component';
import { PreviousDayComponent } from './components/previous-day/previous-day.component';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/stats/stats.component';
import { AllDaysComponent } from './components/all-days/all-days.component';
import { AuthService } from './services/auth.service';
import { QuotesService } from './services/quotes.service';
import { DailyService } from './services/daily.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalDialogComponent } from './components/goal-dialog/goal-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    LoginComponent,
    PreviousDayComponent,
    HeaderComponent,
    StatsComponent,
    AllDaysComponent,
    GoalDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, QuotesService, DailyService],
  bootstrap: [AppComponent],
  entryComponents: [GoalDialogComponent],
})
export class AppModule {}
