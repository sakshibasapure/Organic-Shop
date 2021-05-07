import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/Order/';
  }

  myOrderDetails(userId: number) {
    return this.http.get(this.baseURL + userId);
  }
}
