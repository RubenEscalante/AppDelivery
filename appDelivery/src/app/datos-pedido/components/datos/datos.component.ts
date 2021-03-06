import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Orden } from '../../models/orden';
import { Producto } from '../../models/producto';
import { CarritoService } from 'src/app/carrito/services/carrito.service';
import { MenucartService } from 'src/app/menu/services/menucart.service';
import { OrdenService } from '../../services/orden.service';
import { ToastrService } from 'ngx-toastr';
import { DatosService } from '../../../panel-usuario/services/datos.service';
import { Direccion } from '../../models/direccion';
import { OrdenHistorial } from '../../models/orden-historial';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  //Este es el usuario que utilizo para mostrar los datos
  public usuario: Usuario;
  public orden: Orden;
  public historial: OrdenHistorial;
  public formularioDatos = new FormGroup({
    direccion: new FormControl('', [Validators.required])
  });
  public confirmarOrden: Boolean;
  public ordenProcesada: Boolean;
  public productos;
  public total;

  constructor(
    private carritoServicio: CarritoService,
    private menucartServicio: MenucartService,
    private ordenServicio: OrdenService,
    private toastr: ToastrService,
    private datosServicio: DatosService
  ) { }

  ngOnInit(): void {
    //Aquí debería de obtener los datos del usuario que inició sesión, ya sea del local storage o de la bd
    this.usuario = JSON.parse(localStorage.getItem('user'));

    //Defino la dirección y el teléfono al nuevo usuario registrado
    // if(typeof(this.usuario.direcciones) == 'undefined' && typeof(this.usuario.telefono) == 'undefined'){
    //   let usuarioProvisional = new Usuario(this.usuario.uid,this.usuario.nombre,this.usuario.correo,"",[]);

    //   //Reviso si hay direcciones almacenadas
    //   this.datosServicio.obtenerDirecciones().snapshotChanges().subscribe(item => {
    //     usuarioProvisional.direcciones = [];
    //     item.forEach(element => {
    //       let x = element.payload.toJSON();
    //       usuarioProvisional.direcciones.push(x as Direccion)
    //     })
    //   });

    //   this.usuario = usuarioProvisional;
    //   localStorage.setItem('user',JSON.stringify(this.usuario));
    // }

    if (typeof (this.usuario.direcciones) == 'undefined') {
      this.usuario.direcciones = [];
      localStorage.setItem('user', JSON.stringify(this.usuario));
    }

    if (typeof (this.usuario.telefono) == 'undefined') {
      this.usuario.telefono = "";
      localStorage.setItem('user', JSON.stringify(this.usuario));
    }

    if (typeof (this.usuario.historial) == 'undefined') {
      this.usuario.historial = [];
      localStorage.setItem('user', JSON.stringify(this.usuario));
    } else {
      let arreglo = [];
      let m = Object.entries(this.usuario.historial).forEach(item => {
        arreglo.unshift(item[1] as OrdenHistorial);
      });
      console.log(arreglo);
      this.usuario.historial = arreglo;
    }

    this.productos = this.carritoServicio.get('cart');
    this.confirmarOrden = true;
    this.ordenProcesada = false;
  }

  guardarDireccion(d) {
    this.usuario.direcciones.push(d);
    localStorage.setItem('user', JSON.stringify(this.usuario));
    //Aqui abajo debo guardar la nueva dirección agregada en la base de datos
    this.datosServicio.guardarDireccion(this.usuario.direcciones);
  }

  eliminarDireccion(direccion) {
    let indice = this.usuario.direcciones.indexOf(direccion);
    console.log(this.usuario.direcciones);
    this.usuario.direcciones.splice(indice, 1);
    console.log(this.usuario.direcciones);
    localStorage.setItem('user', JSON.stringify(this.usuario));
    this.datosServicio.eliminarDireccion(this.usuario.direcciones);
    this.toastr.warning('Direccion eliminada exitosamente', 'Direccion Eliminada', {
      progressBar: true,
      timeOut: 1500,
      closeButton: true
    });
  }

  procesarOrden(datos) {

    //Formateando los productos de acuerdo a la estructura definida en el firebase
    let productos = [];
    let carrito = this.carritoServicio.get('cart');
    for (let producto of carrito) {
      let p = new Producto(0, '', '', '', 0);
      p.cantidad = producto.cantidad;
      p.categoria = producto.categoria;
      p.precio = producto.costo;
      p.descripcion = producto.descripcion;
      p.nombre = producto.nombre;
      productos.push(p);
    }

    //Formateando al usuario
    let usuarioOrden = new Usuario(null, '', '', null, [], []);
    usuarioOrden.nombre = this.usuario.nombre;
    usuarioOrden.correo = this.usuario.correo;

    //Formateando la direccion
    let direccion = datos.direccion.direccion + ", " + datos.direccion.municipio + ", " + datos.direccion.departamento;
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

    //Obteniendo el id de la Orden
    let idOrden = this.generatePushID();

    //Construyendo el objeto de la orden que será almacenado en la rama de ordenes de la BD
    this.orden = new Orden(
      0,
      direccion,
      'Recibido',
      fecha,
      idOrden,
      productos,
      this.menucartServicio.getCartTotal(),
      this.menucartServicio.getCartTotal(),
      usuarioOrden,
      this.usuario.telefono
    );

    //Construyendo el objeto de la orden que voy a almacenar en la rama del usuario
    this.historial = new OrdenHistorial(
      idOrden,
      'Recibido',
      fecha,
      direccion,
      productos,
      this.menucartServicio.getCartTotal()
    );


    //Ahora inserto la nueva orden en la primera posición del historial, de manera que la primera orden agregada es la más reciente
    //y las ordenes quedan de la mas nueva a la mas antigua
    this.usuario.historial.unshift(this.historial);

    this.total = this.menucartServicio.getCartTotal();

    //Envio la orden a la rama de ordenes la base de datos
    this.ordenServicio.guardarOrden(this.orden);

    //Envio la orden al historial del cliente y la guardo en el localStorage
    // this.ordenServicio.guardarOrdenHistorial(this.usuario.historial);
    for (let orden of this.usuario.historial) {
      this.ordenServicio.guardarOrdenHistorial(orden);
    }
    localStorage.setItem('user', JSON.stringify(this.usuario));

    //Elimino los productos almacenados en el carrito
    this.carritoServicio.remove('cart');

    this.toastr.success('Orden procesada exitosamente', 'Orden Procesada', {
      progressBar: true,
      timeOut: 1500,
      closeButton: true
    })

    this.confirmarOrden = false;
    this.ordenProcesada = true;
  }

  //Funcion que genera el numero de la orden
  generatePushID = (function () {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;

    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];

    return function () {
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
      if (id.length != 20) throw new Error('Length should be 20.');

      return id;
    };
  })();



}
