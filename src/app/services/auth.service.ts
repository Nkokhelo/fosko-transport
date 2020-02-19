import { Injectable } from '@angular/core';
import { User, AppUser } from '../models/users';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;
  constructor(
    public fbAuth: AngularFireAuth,
    public router: Router,
    public userService: UserService
  ) {
    this.user$ = this.fbAuth.authState;
  }

  async login(user: User) {
    return new Promise((res, rej) => {
      this.fbAuth.auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(u => {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
          res(u);
        })
        .catch(err => {
          rej(err);
        });
    });
  }

  getAppUser(uid): Observable<AppUser> {
    return this.user$.pipe<AppUser>(
      switchMap(firebaseUser => {
        if (firebaseUser) {
          return this.userService.getUser(uid);
        }
        return of(null);
      })
    );
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
    this.fbAuth.auth.signOut();
  }
}
