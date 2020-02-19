import { Injectable } from '@angular/core';
import { AppUser, User } from '../models/users';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public db: AngularFirestore) {}

  saveUser(user: firebase.User) {
    this.db
      .doc(`users/${user.uid}`)
      .update({
        email: user.email,
        emailVerified: user.emailVerified,
        isAdmin: true
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUsers(): Observable<User[]> {
    return this.db.collection<User>('users').valueChanges();
  }

  getUser(uid): Observable<AppUser> {
    return this.db.doc<AppUser>(`/users/${uid}`).valueChanges();
  }
}
