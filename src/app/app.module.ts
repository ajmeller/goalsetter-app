import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TodayComponent } from './components/today/today.component';
import { LoginComponent } from './components/login/login.component';
import { PreviousDayComponent } from './components/previous-day/previous-day.component';
import { AuthService } from './services/auth.service';
import { QuotesService } from './services/quotes.service';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    LoginComponent,
    PreviousDayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [AuthService, QuotesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
