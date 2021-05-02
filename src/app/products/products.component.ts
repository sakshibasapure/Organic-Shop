import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  filteredProducts: Product[] = [];
  private unsubscribe$ = new Subject<void>();
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private subscriptionService:  SubscriptionService
  ) { 
    this.getAllProductData();
  }
  ngOnInit(): void {
    
    

  }

  getAllProductData() {
    this.productService.getAllProducts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (productData: []) => {
        this.productList = productData;

        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
    
          this.filteredProducts = (this.category) ?
            this.productList.filter(p => p.category === this.category) :
            this.productList;
            
      }, error => {
        console.log('Error ocurred while fetching product List : ', error);
      });

      })
     
  }



}
