import { Component, OnInit} from '@angular/core';
import { Usuario } from 'src/app/datos-pedido/models/usuario';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  usuario:Usuario;
  contraBool:Boolean;
  constructor() {
    this.contraBool = false;
   }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    
    //Defino la dirección y el teléfono al nuevo usuario registrado
    if(typeof(this.usuario.direcciones) == 'undefined'){
      let usuarioProvisional = new Usuario(this.usuario.uid,this.usuario.nombre,this.usuario.correo,"",[]);
      this.usuario = usuarioProvisional;
    }
  }

  cambiarContra(){
    this.contraBool = true;
    console.log(this.contraBool);
  }

}
