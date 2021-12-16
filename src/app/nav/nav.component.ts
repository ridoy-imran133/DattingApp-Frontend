import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {}
  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.loginService(this.model).subscribe(next => {
      this.alertifyService.success("Logged in successfully");
    }, error => {
      this.alertifyService.errror(error);
    }, () => {
      this.router.navigate(['/members'])
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem("token");
    this.alertifyService.message("Logged out");
    this.router.navigate(['/home']);
  }

}
