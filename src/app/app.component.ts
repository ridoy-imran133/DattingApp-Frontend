import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  jwtHelper = new JwtHelperService();

  constructor(private authService : AuthService){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    const _user: User = JSON.parse(localStorage.getItem('user'));
    if(token){
      this.authService.decodeToken = this.jwtHelper.decodeToken(token);
    }
    if(_user){
      this.authService.currentUser = _user;
    }
  }
}
