import { enviroment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
//  Logic API ----- HTTP Client
  constructor(private httpClient:HttpClient) { }

// Logic Function 

  getAllProducts():Observable<any>{
     return this.httpClient.get(`${enviroment.baseUrl}/api/v1/products`)
  }
  getSpecificProduct(id:string):Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}/api/v1/products/${id}`)
  }
}
