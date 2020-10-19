import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.css']
})
export class AutentificacionComponent implements OnInit {

  //Formulario
  signupForm: FormGroup;


  constructor(public authService: AuthService,
              private fb: FormBuilder) { }

  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nombre: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(22)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(12)])
    }); 

    this.authService.getClients();
  }

  registrarUsuario(){
    if (this.signupForm.invalid) {
      return;
    } 
    //TODO: Este formulario no deberia de enviarse asi 
    this.authService.SignUp(this.signupForm.value.nombre, this.signupForm.value.correo, this.signupForm.value.pwd)
  }

  isFieldValid(field: string) {
    return !this.signupForm.get(field).valid && this.signupForm.get(field).touched;
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
