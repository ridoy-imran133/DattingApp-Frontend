import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormValidationBuilderModel } from '../_models/FormValidationBuilderModel';

@Injectable({
  providedIn: 'root'
})
export class FormvalidationService {
  _customMessageObj: any;
  public _formBuilder: FormValidationBuilderModel;

  constructor(private formBuilder: FormBuilder) {
    this._formBuilder = new FormValidationBuilderModel();
  }

  getUserInfoBuilderConfig(){
    this._formBuilder.formGroup = this.formBuilder.group({
    });
  }
}
