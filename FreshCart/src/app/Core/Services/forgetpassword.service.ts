import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/auth/`;

  forgetPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `forgotPasswords`,userEmail)
  }

  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'verifyResetCode',resetCode)
  }

  resetPassword(resetPassword:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl + 'resetPassword',resetPassword)
  }
}
