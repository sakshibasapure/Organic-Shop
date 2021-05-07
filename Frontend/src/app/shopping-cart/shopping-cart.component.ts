import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shoppingcart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

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

  deleteCartItem(productId: number) {
    this.cartService.removeCartItems(this.userId, productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting cart item : ', error);
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
  addToCart(productId: number) {
    this.cartService.addProductToCart(this.userId, productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while addToCart data : ', error);
        });
  }

  deleteOneCartItem(productId: number) {
    this.cartService.deleteOneCartItem(this.userId, productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while fetching product data : ', error);
        });
  }

  clearCart() {
    this.cartService.clearCart(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting cart item : ', error);
        });
  }

  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
