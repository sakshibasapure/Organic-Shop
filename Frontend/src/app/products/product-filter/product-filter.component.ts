import { Categories } from 'src/app/models/categories';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  categoryList:  [];
  categories$: Observable<Categories[]>;
  @Input('category') category;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private subscriptionService:  SubscriptionService
  ) { 
    this.getCategories();
  }

  ngOnInit(): void {
  }

  getCategories(){
    this.productService.categories$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (categoryData: []) => {
        this.categoryList = categoryData;
      }, error => {
        console.log('Error ocurred while fetching category List : ', error);
      });
  }

}
