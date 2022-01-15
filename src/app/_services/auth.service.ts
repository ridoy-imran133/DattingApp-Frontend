import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodeToken : any;
  currentUser: User;
  constructor(private http: HttpClient) { }

  changeNavMainPhoto(photoURL: string){
    this.currentUser.photoUrl= photoURL;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }
  loginService(model: any){
    return this.http.post(this.baseUrl + 'Auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if(user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          console.log(this.decodeToken);
        }
      })
    );
  }

  registerService(model: User){
    return this.http.post(this.baseUrl + 'Auth/register', model)
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
