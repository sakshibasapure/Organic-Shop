import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shoppingcart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit{

  public cartItems: ShoppingCart[];
  userId;
  totalPrice: number;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean;

  constructor(
    private cartService: ShoppingCartService,
    private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.cartItems = [];
    this.isLoading = true;
    this.getShoppingCartItems();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach(item => {
      this.totalPrice += (item.product.price * item.quantity);
    });
  }

  getShoppingCartItems() {
    this.cartService.getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: ShoppingCart[]) => {
          this.cartItems = result;
          this.getTotalPrice();
          this.isLoading = false;
        }, error => {
          console.log('Error ocurred while fetching shopping cart item : ', error);
        });
  }


}
