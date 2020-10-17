import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Orden } from '../../models/orden';
import { Producto } from '../../models/producto';
import { CarritoService } from 'src/app/carrito/services/carrito.service';
import { MenucartService } from 'src/app/menu/services/menucart.service';
import { OrdenService } from '../../services/orden.service';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  //Este es el usuario que utilizo para mostrar los datos
  public usuario:Usuario;
  public orden:Orden;
  public formularioDatos = new FormGroup({
    direccion: new FormControl('',[Validators.required])
  });

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

  
  constructor(
    private carritoServicio:CarritoService,
    private menucartServicio:MenucartService,
    private ordenServicio:OrdenService
  ) { }

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

  procesarOrden(datos){

    let productos = [];
    let carrito = this.carritoServicio.get('cart');
    for(let producto of carrito){
      let p = new Producto(0,'','','',0);
      p.cantidad = producto.quantity;
      p.categoria = producto.type;
      p.precio = producto.price;
      p.descripcion = producto.description;
      p.nombre = producto.name;
      productos.push(p);
    }
    
    let usuarioOrden = new Usuario('','',null,[]);
    usuarioOrden.nombre = this.usuario.nombre;
    usuarioOrden.correo = this.usuario.correo;

    let direccion = datos.direccion.direccion+", "+datos.direccion.municipio+", "+datos.direccion.departamento;
    console.log(direccion);

    let fecha_ob = new Date();
    let dia = ("0" + fecha_ob.getDate()).slice(-2);
    let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
    let año = fecha_ob.getFullYear();
    let horas = fecha_ob.getHours();
    let minutos = fecha_ob.getMinutes();
    let segundos = fecha_ob.getSeconds();
    let fecha = dia + "/" + mes + "/" + año + " " + horas + ":" + minutos + ":" + segundos;


    this.orden = new Orden(
      0,
      direccion,
      'Recibido',
      fecha,
      "orden2",
      productos,
      this.menucartServicio.getCartTotal(),
      this.menucartServicio.getCartTotal(),
      usuarioOrden,
      this.usuario.telefono
    );

    console.log(this.orden);
    this.ordenServicio.guardarOrden(this.orden);
    this.carritoServicio.remove('cart');
  }


}
