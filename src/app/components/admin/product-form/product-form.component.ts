import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$!: Observable<any[]>;
  product!: Product | null;
  id!: string | null;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  save(product: any) {
    if (this.id) this.productService.updateProduct(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product")) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);

  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.categories$.subscribe((categories) => {
      console.log(categories);
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).subscribe((product) => {
      this.product = product;
      });
    } else {
      this.product = null;
    }
  }
}
