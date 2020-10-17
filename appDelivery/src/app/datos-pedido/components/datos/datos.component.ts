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
  public ordenesRegistradas;

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

    //Formateando los productos de acuerdo a la estructura definida en el firebase
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
    
    //Formateando al usuario
    let usuarioOrden = new Usuario('','',null,[]);
    usuarioOrden.nombre = this.usuario.nombre;
    usuarioOrden.correo = this.usuario.correo;

    //Formateando la direccion
    let direccion = datos.direccion.direccion+", "+datos.direccion.municipio+", "+datos.direccion.departamento;
    console.log(direccion);

    //Formateando la fecha de creación de la orden
    let fecha_ob = new Date();
    let dia = ("0" + fecha_ob.getDate()).slice(-2);
    let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
    let año = fecha_ob.getFullYear();
    let horas = fecha_ob.getHours();
    let minutos = fecha_ob.getMinutes();
    let segundos = fecha_ob.getSeconds();
    let fecha = dia + "/" + mes + "/" + año + " " + horas + ":" + minutos + ":" + segundos;

    //Construyendo el objeto de la orden que será almacenado en al BD
    this.orden = new Orden(
      0,
      direccion,
      'Recibido',
      fecha,
      this.generatePushID(),
      productos,
      this.menucartServicio.getCartTotal(),
      this.menucartServicio.getCartTotal(),
      usuarioOrden,
      this.usuario.telefono
    );

    this.ordenServicio.guardarOrden(this.orden);
    this.carritoServicio.remove('cart');
  }

  //Funcion que genera el numero de la orden
  generatePushID = (function() {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  
    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;
  
    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];
  
    return function() {
      var now = new Date().getTime();
      var duplicateTime = (now === lastPushTime);
      lastPushTime = now;
  
      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0) throw new Error('We should have converted the entire timestamp.');
  
      var id = timeStampChars.join('');
  
      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if(id.length != 20) throw new Error('Length should be 20.');
  
      return id;
    };
  })();
  


}
