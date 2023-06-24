import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  currencyCode: string = 'USD';
  @Input('Product') product!: Product | null;
  @Input() productData: {
    title: string | null;
    price: number | null;
    imageUrl: string | null;
  } = { title: null, price: null, imageUrl: null };
  @Input('show-actions') showActions = true;
  constructor() {}
}
