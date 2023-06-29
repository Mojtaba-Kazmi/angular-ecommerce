import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from 'src/app/model/app-user';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/model/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser!: AppUser
  shoppingCartItemCount!: number;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
    
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe( appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logOut() {
    this.auth.logout();
  }
}
