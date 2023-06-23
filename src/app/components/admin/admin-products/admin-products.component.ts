import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Subscription, map } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  filteredProducts!: any[];
  product$: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(
      (products: Product[]) => {
        this.filteredProducts = this.product$ = products;
      }
    );    
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.product$.filter((p) =>
          p.title?.toLowerCase().includes(query.toLowerCase())
        )
      : this.product$;
  }
}
