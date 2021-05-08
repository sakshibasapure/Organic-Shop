import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Observable, Subject } from 'rxjs';
import { WishlistService } from 'src/app/services/whishlist.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistItems$: Observable<Product[]>;
  isLoading: boolean;
  userId;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private subscriptionService: SubscriptionService,
    private wishlistService: WishlistService,) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getWishlistItems();
  }

  getWishlistItems() {
    this.wishlistItems$ = this.subscriptionService.wishlistItem$;
    this.isLoading = false;
  }

  clearWishlist() {
    this.wishlistService.clearWishlist(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.wishlistItemcount$.next(result);
          console.log('Wishlist cleared!!!');
          //this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting wishlist item : ', error);
        });
  }
}