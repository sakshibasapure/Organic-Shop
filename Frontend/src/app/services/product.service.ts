import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'https://localhost:5001/api/product/';

  constructor(private http: HttpClient) { }

  categories$ = this.http.get<Categories[]>(this.baseURL + 'GetCategoriesList').pipe(shareReplay(1));

  products$ = this.getAllProducts().pipe(shareReplay(1));

  getAllProducts() {
    return this.http.get<Product[]>(this.baseURL);
  }

  addProduct(product) {
    return this.http.post(this.baseURL, product);
  }

  getProductById(id: number) {
    return this.products$.pipe(map(product => product.find(b => b.productId === id)));
  }

  /*getsimilarProducts(productId: number) {
    return this.http.get<Product[]>(this.baseURL + 'GetSimilarProducts/' + productId);
  }*/

  updateProductDetails(product) {
    return this.http.put(this.baseURL, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseURL + id);
  }
}