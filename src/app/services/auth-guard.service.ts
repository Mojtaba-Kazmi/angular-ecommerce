
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor( private auth: AuthService, private router: Router) {
   }
   
   canActivate(state: RouterStateSnapshot) {
      return this.auth.user$.pipe(map(user => {
        if (user) return true;
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;

      }));
   }
}
