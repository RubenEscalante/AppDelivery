import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  //Este simula ser el usuario que estará almacenado en el local storage
  usuarioRegistrado:Usuario = {
    nombre:"José Ricardo Majano De Paz",
    correo:"ricardo.majano@pupusa.com",
    telefono:"2255-55555",
    direcciones:[
      {nombre:"Dirección 1", direccion:"Colonia el pepeto, pasaje 11, casa #54", municipio:"Mejicanos", departamento:"San Salvador"},
      {nombre:"Dirección 2", direccion:"Colonia el pepeto, pasaje 11, casa #54", municipio:"Mejicanos", departamento:"San Salvador"},
      {nombre:"Dirección 3", direccion:"Colonia el pepeto, pasaje 11, casa #54", municipio:"Mejicanos", departamento:"San Salvador"}
    ]
  };

  //Este es el usuario que utilizo para mostrar los datos
  public usuario:Usuario;
  constructor() { }

  ngOnInit(): void {
    //localStorage.setItem('user',JSON.stringify(this.usuarioRegistrado));
    //Aquí debería de obtener los datos del usuario que inició sesión, ya sea del local storage o de la bd
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  guardarDireccion(d){
    this.usuario.direcciones.push(d);
    localStorage.setItem('user',JSON.stringify(this.usuario));
    //Aqui abajo debo guardar la nueva dirección agregada en la base de datos
  }



}
