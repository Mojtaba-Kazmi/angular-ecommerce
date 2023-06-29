import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Product } from '../model/product';
import { Observable, filter, map, take } from 'rxjs';
import { ShoppingCart } from '../model/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async addToCart(product: Product | null) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product | null) {
    this.updateItem(product, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    const cartRef: AngularFireObject<ShoppingCart> = this.db.object(`/shopping-carts/${cartId}`);
    return cartRef.valueChanges().pipe(map((x) => new ShoppingCart(x?.items)));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  async updateItem(product: Product | null, change: number) {
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.getItemRef(cartId, product?.key);

    itemRef
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity = item ? item.quantity + change : change;
        if (quantity === 0) itemRef.remove();
        else itemRef.update({
          title: product?.title,
          imageUrl: product?.imageUrl,
          price: product?.price,
          quantity: quantity
        });
      });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result: any = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItemRef(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }
}
