import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

  loginWithGoogle() {
    this.authService
      .googleAuth()
      .pipe(take(1))
      .subscribe((response) => {
        this.authService.setUserData(response.user);
        console.log(response.user);
        this.router.navigate(['today']);
      });
  }

  ngOnInit(): void {
    this.authService
      .signOut()
      .pipe(take(1))
      .subscribe((response) => {
        sessionStorage.removeItem('user');
        this.router.navigate(['login']);
      });
  }
}
