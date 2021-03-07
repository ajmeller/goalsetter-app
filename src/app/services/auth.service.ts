import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //user: User = { uid: '', email: '', displayName: '' };

  userData: any;

  parseUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.parseUserData();
      } else {
        localStorage.setItem('user', null);
        this.parseUserData();
      }
    });
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['today']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = this.parseUserData();
    return user !== null;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['today']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
