import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private subscriptionService:  SubscriptionService
  ) { 
   
  }
  ngOnInit(): void {
    this.getAllProductData();

  }

  getAllProductData() {
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
