import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product!: Product | null;
  @Input() productData: { title?: string; price?: number; imageUrl?: string } =
    {};
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart | any;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
