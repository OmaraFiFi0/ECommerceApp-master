import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  myToken: any = localStorage.getItem('userToken');

  checkOutPayMent(id:string , data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` , 
      {
        "shippingAddress":data
    },
    )
  }
}
