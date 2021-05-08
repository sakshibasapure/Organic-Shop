import { WishlistService } from 'src/app/services/whishlist.service';
import { Product } from 'src/app/models/product';
import { Component, Input, OnChanges } from '@angular/core';

import { SubscriptionService } from 'src/app/services/subscription.service';



@Component({
  selector: 'app-addtowishlist',
  templateUrl: './addtowishlist.component.html',
  styleUrls: ['./addtowishlist.component.css']
})
export class AddtowishlistComponent implements OnChanges {

  @Input()
  productId: number;

  @Input()
  showButton = false;

  userId;
  toggle: boolean;
  buttonText: string;
  public wishlistItems: Product[];

  constructor(
    private wishlistService: WishlistService,
    private subscriptionService: SubscriptionService,) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnChanges() {
    this.subscriptionService.wishlistItem$.pipe().subscribe(
      (productData: Product[]) => {
        this.setFavourite(productData);
        this.setButtonText();
      });
  }

  setFavourite(productData: Product[]) {
    const favProduct = productData.find(f => f.productId === this.productId);

    if (favProduct) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  setButtonText() {
    if (this.toggle) {
      this.buttonText = 'Remove from Wishlist';
    } else {
      this.buttonText = 'Add to Wishlist';
    }
  }

  toggleValue() {
    this.toggle = !this.toggle;
    this.setButtonText();

    this.wishlistService.toggleWishlistItem(this.userId, this.productId).subscribe(
      () => {
        if (this.toggle) {
          console.log('Item added to your Wishlist');
        } else {
          console.log('Item removed from your Wishlist');
        }
      }, error => {
        console.log('Error ocurred while adding to wishlist : ', error);
      });
  }

  
}
