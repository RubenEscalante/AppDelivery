import { Component, OnInit } from '@angular/core';

import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms'; 

import { AuthService } from '../services/auth.service';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';   

import {Router} from '@angular/router';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css']
})
export class LoginmodalComponent implements OnInit {

  //Formulario
  loginForm: FormGroup;
  constructor(public authService: AuthService,
              public activeModal: NgbActiveModal,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(12)])
    }); 

    this.authService.getClients();


  }

 
  autentificacion(){
    if (this.loginForm.invalid) {
      return;
    } 
    this.authService.SignIn(this.loginForm.value.correo, this.loginForm.value.pwd); 
    this.activeModal.dismiss(); 
  } 
  
  autentificacionGoogle(){
    this.authService.GoogleAuth();
    this.activeModal.dismiss();
  }

}
