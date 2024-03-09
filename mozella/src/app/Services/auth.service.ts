import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, loginDetails, loginResponse, registerUserResponse, userDetailsResponse } from '../Interfaces/user.Interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User){
    return this.http.post<registerUserResponse>('http://localhost:4500/users/register', userDetails);
  }

  loginUser(userDetails: loginDetails){
    return this.http.post<loginResponse>('http://localhost:4500/users/login', userDetails)
  }
  checkUserDetails(token:string){
    return this.http.get<userDetailsResponse>('http://localhost:4500/users/details', {
      headers: {
        token
      }
    })
  }
}
