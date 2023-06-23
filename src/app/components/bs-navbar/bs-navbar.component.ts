import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from 'src/app/model/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser!: AppUser
  constructor(private auth: AuthService) {
    this.auth.appUser$.subscribe( appUser => this.appUser = appUser);
  }

  logOut() {
    this.auth.logout();
  }
}
