import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TodayComponent } from './components/today/today.component';
import { LoginComponent } from './components/login/login.component';
import { PreviousDayComponent } from './components/previous-day/previous-day.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    LoginComponent,
    PreviousDayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatIconModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
