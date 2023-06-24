import { Product } from 'src/app/model/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string | null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getAll().pipe( // Use pipe() to chain operators
      switchMap((product) => {
        this.products = product;
        return this.route.queryParamMap;
      })
    )
    .subscribe((params) => {
      this.category = params.get('category');

      this.filteredProducts = this.category
        ? this.products.filter((p) => p.category === this.category)
        : this.products;
    });

   
  }
}
