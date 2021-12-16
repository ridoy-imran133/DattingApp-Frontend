import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
              private alertifyService: AlertifyService){}
  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    
    this.alertifyService.errror('You will not pass');
    this.router.navigate(['/home']);
    return false;
    
  }
  
}
