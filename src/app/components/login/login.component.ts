import { Component, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { trace } from '@angular/fire/performance';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showLoginButton = false;
  showLogoutButton = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.authService.googleAuth();
  }
}
