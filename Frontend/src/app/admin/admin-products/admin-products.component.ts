import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productList: [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (productData: []) => {
        this.productList = productData;
      }, error => {
        console.log('Error ocurred while fetching product List : ', error);
      });
    
  }

}
