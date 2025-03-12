import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient:HttpClient) { }
private readonly router = inject(Router)
  userData:any = null


  SendRegisterData(data:string):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signup` ,data )
  }
  SendLoginData(data:string):Observable<any>{
      return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signin`, data)
  }
  
  SendEmailData(data:string):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  SendCodeVerfiyPassword(data:string):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }

  SendResetPassword(data:string):Observable<any>{
    return this.httpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword` , data)
  }

  saveUserData():void{
    if(localStorage.getItem("userToken")!==null){
      this.userData = jwtDecode(localStorage.getItem("userToken")!)
      console.log("userData" , this.userData)
    }
  }
  // To LogOut 
  LogOut():void{
    localStorage.removeItem("userToken")  // To Make Local Storage Null
    this.userData = null  // userData from jwtDecode
    this.router.navigate(["/login"]) // navigate To Login
  }



}
