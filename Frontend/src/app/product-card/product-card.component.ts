  
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  cartItemCount$: Observable<number>;
  
   userId;
  isActive = false;
  userData$: Observable<User>;

  constructor(private router: Router, 
              private subscriptionService: SubscriptionService,
              private authService: AuthenticationService,
              private userService: UserService
  
    //private wishlistService: WishlistService
    ) {

      this.userId = localStorage.getItem('userId');
      this.userService.getCartItemCount(this.userId).subscribe((data: number) => {
      this.subscriptionService.cartItemcount$.next(data);
     
    });
   }

  ngOnInit() {
    this.userData$ = this.subscriptionService.userData;
  }

  goToPage(id: number) {
    this.router.navigate(['/products/details/', id]);
  }




}
