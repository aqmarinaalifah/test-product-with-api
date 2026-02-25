import { Injectable } from '@angular/core';
import { Product } from './home.type';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  getProductList(): Observable<any> {
    return this._http.get('https://dummyjson.com/products');
    // .pipe(
    //   tap<any>((response) => {
    //     this._productList.next(response.products);
    //     return response;
    //   }),
    // );
  }

  getProductById(id: string): Observable<any> {
    return this._http.get(`https://dummyjson.com/products/${id}`);
  }
}
