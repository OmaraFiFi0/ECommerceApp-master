import { enviroment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}
  // myToken: any = localStorage.getItem('userToken');

  AddProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      `${enviroment.baseUrl}/api/v1/cart`,
      { productId: id }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${enviroment.baseUrl}/api/v1/cart`, );
  }
  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${enviroment.baseUrl}/api/v1/cart/${id}`);
  }
  updateCartProductQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(
      `${enviroment.baseUrl}/api/v1/cart/${id}`,
      {
        count: newCount,
      },
    );
  }

  ClearAllCartItems(): Observable<any> {
    return this.httpClient.delete(`${enviroment.baseUrl}/api/v1/cart`);
  }
}

// Method  ==> post  , put  ---> url(api) , body ,  ----- options headers
// Method  ==> get  , delete  ---> url(api) ,  ----- options headers
