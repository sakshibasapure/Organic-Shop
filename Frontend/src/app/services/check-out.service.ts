import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/CheckOut/';
  }

  placeOrder(userId: number, checkedOutItems: Order) {
    return this.http.post<number>(this.baseURL + `${userId}`, checkedOutItems);
  }

}
