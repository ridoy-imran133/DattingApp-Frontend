import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
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
  model: User;
  registerForm : FormGroup;
  bsConfig: Partial<BsDatepickerConfig>; // For Date Animation
  constructor(private authService: AuthService, private router: Router,
              private alertifyService: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    }
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', 
    //   [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required),
    // }, this.passwordMatchValidator);

    this.createRegisterForm();
  }

  createRegisterForm(){
     this.registerForm = this.fb.group({
        gender:['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required]
     }, {validators: this.passwordMatchValidator});
  }

  register(){
    // this.authService.registerService(this.model).subscribe( () =>{
    //   this.alertifyService.success('registration Successfull');
    // },error => {
    //   this.alertifyService.errror(error)
    // });

    if(this.registerForm.valid){
      this.model = Object.assign({}, this.registerForm.value);
      this.authService.registerService(this.model).subscribe( () =>{
        this.alertifyService.success('registration Successfull');
      },error => {
        this.alertifyService.errror(error)
      }, () => {
        this.authService.loginService(this.model).subscribe(() => {
          this.router.navigate(['/members']);
        })
      });
      //   this.alertify.success('Registration Successfull')
      // }, error => {
      //   this.alertifyService.errror(error)
      // })
    }
    console.log(this.registerForm.value);
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  cancel(){
    this.cancelRegister.emit(false);
    this.alertifyService.warning("Cancelled");
  }
}
