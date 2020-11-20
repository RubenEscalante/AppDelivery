import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Usuario } from 'src/app/datos-pedido/models/usuario';
import { AuthService } from '../../../autentificacion/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  activarContra:Boolean;
  cambiarContra = new FormGroup({
    contra: new FormControl('',[Validators.required]),
    nuevaContra: new FormControl('',[Validators.required]),
    confirmarContra: new FormControl('',[Validators.required])
  });
  usuario:Usuario;

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.activarContra = false;
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  activarDesactivar(bool){
    this.activarContra = bool;
  }

  resetearContra(){

    // let correo = this.usuario.correo;
    // this.auth.SignOut();
    this.auth.ForgotPassword(this.usuario.correo);
    
  }
}
