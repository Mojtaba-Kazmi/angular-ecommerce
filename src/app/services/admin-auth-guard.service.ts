import { Observable, map, of } from 'rxjs';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppUser } from '../model/app-user';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser: AppUser | null) => !!appUser && appUser.isAdmin)
    );
  }
}
