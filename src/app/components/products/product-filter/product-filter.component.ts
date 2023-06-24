import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit{
  category$: any;
  @Input('category') category: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.category$ = this.categoryService.getAll();
  }

}
