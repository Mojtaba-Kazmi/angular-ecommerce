import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription!: Subscription;
  product$: Product[] = [];
  productDataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'edit'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

  ngAfterViewInit() {
    this.productDataSource.paginator = this.paginator;
    this.productDataSource.sort = this.sort;
  }
  

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(
      products => {
        this.product$ = products;
        this.productDataSource = new MatTableDataSource(this.product$);
        this.productDataSource.paginator = this.paginator;
        this.productDataSource.sort = this.sort;
      },
      error => {
        console.log(error); // Optional: Check if there are any errors
      }
    );
  }
  

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productDataSource.filter = filterValue.trim().toLowerCase();

    if (this.productDataSource.paginator) {
      this.productDataSource.paginator.firstPage();
    }
  }
}
