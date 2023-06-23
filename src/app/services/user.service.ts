import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AppUser } from '../model/app-user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db
      .object<AppUser>('/users/' + uid)
      .valueChanges()
      .pipe(
        map((user) => user || null as any)
      );
  }
  
}
