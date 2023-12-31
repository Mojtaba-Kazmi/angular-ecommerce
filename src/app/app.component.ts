import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    router: Router
  ) {
    this.auth.user$.subscribe((user) => {
      if (!user) return;

      this.userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      const navigationUrl: string | UrlTree = returnUrl || '/default';
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(navigationUrl);
    });
  }
}
