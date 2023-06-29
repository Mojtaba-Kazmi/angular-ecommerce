import { AuthService } from './../../services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {

  orders$!: Observable<any[]>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap(u => this.orderService.getOrdersByUser(u!.uid))
    ).pipe(
      tap(orders => console.log(orders))
    );
  }
  
}
