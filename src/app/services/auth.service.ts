import { Injectable, NgZone, Output } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.parseUserData();
      } else {
        sessionStorage.setItem('user', '');
        this.parseUserData();
      }
      this.getIsLoggedIn.emit(this.isLoggedIn);
    });
  }

  @Output() getIsLoggedIn: EventEmitter<boolean> = new EventEmitter();

  get isLoggedIn(): boolean {
    const user = this.parseUserData();
    return user !== undefined;
  }

  get user(): User {
    const userData = this.parseUserData();
    if (userData) {
      const user = { uid: userData.uid, displayName: userData.displayName };
      return user;
    } else {
      return { uid: '', displayName: '' };
    }
  }

  parseUserData() {
    const userStorage = sessionStorage.getItem('user');
    if (userStorage) {
      return JSON.parse(userStorage);
    }
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['today']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  setUserData(userData: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${userData.uid}`
    );

    const user: User = {
      uid: userData.uid,
      displayName: userData.displayName,
    };

    return userRef.set(user);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.getIsLoggedIn.emit(this.isLoggedIn);
      this.router.navigate(['login']);
    });
  }
}
