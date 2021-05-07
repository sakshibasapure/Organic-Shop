import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent  {

  @Input()
  productId: number;

  userId;
  

  constructor(
    private cartService : ShoppingCartService,
    private subscriptionService: SubscriptionService)
     {
      this.userId = localStorage.getItem('userId');
    }

  addToCart() {
    this.cartService.addProductToCart(this.userId, this.productId).subscribe(
      result => {
        console.log(result);
        this.subscriptionService.cartItemcount$.next(result);
      }, error => {
        console.log('Error ocurred while addToCart data!!!!! : ', error);
      });
  }

}
