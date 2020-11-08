import { Component, OnInit} from '@angular/core';
import { Direccion } from 'src/app/datos-pedido/models/direccion';
import { Usuario } from 'src/app/datos-pedido/models/usuario';
import { DatosService } from '../../services/datos.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  usuario:Usuario;
  contraBool:Boolean;
  perfilUsuario = new FormGroup({
    telefono: new FormControl('',[Validators.required])
  });
  constructor(private datosServicio:DatosService) {
    this.contraBool = false;
    
   }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    
    //Defino la dirección y el teléfono al nuevo usuario registrado
    if(typeof(this.usuario.direcciones) == 'undefined' && typeof(this.usuario.telefono) == 'undefined'){
      let usuarioProvisional = new Usuario(this.usuario.uid,this.usuario.nombre,this.usuario.correo,"",[]);

      //Reviso si hay direcciones almacenadas
      this.datosServicio.obtenerDirecciones().snapshotChanges().subscribe(item => {
        usuarioProvisional.direcciones = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          usuarioProvisional.direcciones.push(x as Direccion)
        })
      });
      
      this.usuario = usuarioProvisional;
      localStorage.setItem('user',JSON.stringify(this.usuario));
    }
  }

  cambiarContra(){
    this.contraBool = true;
    console.log(this.contraBool);
  }

  guardarDireccion(d){
    this.usuario.direcciones.push(d);
    localStorage.setItem('user', JSON.stringify(this.usuario));
    this.datosServicio.guardarDireccion(this.usuario.direcciones);
  }

  validarCadena(control:FormControl):ValidationErrors{
    if(Number(control.value)){
      return {validarCadena:true};
    }else{
      return null;
    }
  }

}
