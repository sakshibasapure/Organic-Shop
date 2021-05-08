import { Product } from 'src/app/models/product';
  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseURL: string;

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService) {
    this.baseURL = 'https://localhost:5001/api/Wishlist/';
  }

  toggleWishlistItem(userId: number, productId: number) {
    return this.http.post<Product[]>(this.baseURL + `ToggleWishlist/${userId}/${productId}`, {})
      .pipe(map((response: Product[]) => {
        this.setWishlist(response);
        return response;
      }));
  }

  getWishlistItems(userId: number) {
    return this.http.get(this.baseURL + userId)
      .pipe(map((response: Product[]) => {
        this.setWishlist(response);
        return response;
      }));
  }

  setWishlist(response: Product[]) {
    this.subscriptionService.wishlistItemcount$.next(response.length);
    this.subscriptionService.wishlistItem$.next(response);
  }

  clearWishlist(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {}).pipe(
      map((response: number) => {
        this.subscriptionService.wishlistItem$.next([]);
        return response;
      })
    );
  }
}