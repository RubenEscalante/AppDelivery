import { Component, OnInit} from '@angular/core';
import { Direccion } from 'src/app/datos-pedido/models/direccion';
import { Usuario } from 'src/app/datos-pedido/models/usuario';
import { DatosService } from '../../services/datos.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../autentificacion/services/auth.service'

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  usuario:Usuario;
  contraBool:Boolean;
  perfilUsuario:FormGroup;
  constructor(
    private datosServicio:DatosService,
    private toastr:ToastrService,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.perfilUsuario = new FormGroup({
      telefono: new FormControl(this.usuario.telefono,[Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}')])
    });

    //Defino la dirección y el teléfono al nuevo usuario registrado
    if(typeof(this.usuario.direcciones) == 'undefined'){
      this.usuario.direcciones = [];
      localStorage.setItem('user',JSON.stringify(this.usuario));
    }
    if(typeof(this.usuario.telefono) == 'undefined'){
      this.usuario.telefono = "";
      localStorage.setItem('user',JSON.stringify(this.usuario));
    }
  }

  cambiarContra(){
    this.contraBool = true;
    console.log(this.contraBool);
  }

  guardarDireccion(direccion){
    this.usuario.direcciones.push(direccion);
    localStorage.setItem('user', JSON.stringify(this.usuario));
    this.datosServicio.guardarDireccion(this.usuario.direcciones);
    this.toastr.success('Direccion guardada exitosamente', 'Nueva Direccion',{
      progressBar: true,
      timeOut: 1500,
      closeButton: true
    });
  }

  eliminarDireccion(direccion){
    let indice = this.usuario.direcciones.indexOf(direccion);
    console.log(this.usuario.direcciones);
    this.usuario.direcciones.splice(indice,1);
    console.log(this.usuario.direcciones);
    localStorage.setItem('user', JSON.stringify(this.usuario));
    this.datosServicio.eliminarDireccion(this.usuario.direcciones);
    this.toastr.warning('Direccion eliminada exitosamente', 'Direccion Eliminada',{
      progressBar: true,
      timeOut: 1500,
      closeButton: true
    });
  }

  guardarTelefono(datos){
    this.usuario.telefono = datos.telefono;
    console.log("enviando telefono:"+datos.telefono);
    localStorage.setItem('user',JSON.stringify(this.usuario));
    this.datosServicio.guardarTelefono(this.usuario.telefono);
    this.toastr.success('Telefono actualizado exitosamente', 'Telefono Actualizado',{
      progressBar: true,
      timeOut: 1500,
      closeButton: true
    });
  }



  validarCadena(control:FormControl):ValidationErrors{
    if(Number(control.value)){
      return {validarCadena:true};
    }else{
      return null;
    }
  }

}
