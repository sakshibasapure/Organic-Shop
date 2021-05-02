import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;

  constructor(private cartService : ShoppingCartService) { }

  addToCart(product: Product) {
    let cartId = localStorage.getItem('cartId')
    if (!cartId) {

    }
  }



}
