import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable, map } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( 
    private shoppingCartService: ShoppingCartService,
    private db: AngularFireDatabase
  ) { }

  async placeOrder(order: any) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(
        map((snapshots) =>
          snapshots.map((snapshot) => ({
            key: snapshot.key,
            ...snapshot.payload.val() as Order
          }))
        )
      );
  }

  getOrdersByUser(userId: string): Observable<any[]> {
    return this.db.list('/orders', ref => 
      ref.orderByChild('userId').equalTo(userId)
    ).snapshotChanges().pipe(
      map((snapshots) =>
        snapshots.map((snapshot) => ({
          key: snapshot.key,
          ...snapshot.payload.val() as Order
        }))
      )
    );
  }
  

}
