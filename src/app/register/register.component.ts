import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authService.registerService(this.model).subscribe( () =>{
      this.alertifyService.success('registration Successfull');
    },error => {
      this.alertifyService.errror(error)
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    this.alertifyService.warning("Cancelled");
  }
}
