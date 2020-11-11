import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';  
import { OrdenHistorial } from 'src/app/datos-pedido/models/orden-historial';
import { DatosService } from '../../services/datos.service';
import { Producto } from '../../../datos-pedido/models/producto';

import { database } from 'firebase/app';

@Component({
  selector: 'app-historial-ordenes',
  templateUrl: './historial-ordenes.component.html',
  styleUrls: ['./historial-ordenes.component.css']
})
export class HistorialOrdenesComponent implements OnInit {

  usuario;
  ordenSeleccionada;
  historial:OrdenHistorial[];
  productos:Producto[];
  formularioDireccion = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    direccion: new FormControl('',[Validators.required]),
    departamento: new FormControl('',[Validators.required]),
    municipio: new FormControl('',[Validators.required])
  });

  constructor(
    public activeModal: NgbActiveModal,
    public datosServicio:DatosService
  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));

    this.datosServicio.obtenerHistorial().snapshotChanges().subscribe(item =>{
      this.historial = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        this.historial.push(this.formatearDatos(x) as OrdenHistorial);
      });

      this.ordenSeleccionada = this.historial[0];

      if(this.ordenSeleccionada == undefined){
        this.ordenSeleccionada = "";
        this.historial = [];
      }

      // let historialProvicional:OrdenHistorial[] = [];
      // for(let orden of this.historial){
      //   let refkey1 = database().ref('ordenes').child(orden.id);
      //   refkey1.on('value', snapshot => {
      //     orden.estado = snapshot.val().estado;
      //     historialProvicional.push(orden);
      //     this.historial = historialProvicional;
      //     this.datosServicio.guardarHistorial(this.historial);
      //   });
      // }
      
      

    });

    // this.ordenSeleccionada = this.usuario.historial[0];
  }

  formatearDatos(x){
    this.productos = [];
    let p = Object.entries(x.productos).forEach(item => {
      this.productos.push(item[1] as Producto);
    });
    x.productos = this.productos;
    return x;
  }

  seleccionarOrden(orden){
    this.ordenSeleccionada = orden;
    console.log(this.ordenSeleccionada);
  }

  formatearFecha(fechaOrden, modo){
    let fechaHora = fechaOrden.split(" ");
    let fecha = fechaHora[0].split("/");
    let hora = fechaHora[1];

    let dia = fecha[0];
    let mes = fecha[1];
    let year = fecha[2];

    let fechaFormateada = mes+"/"+dia+"/"+year+" "+hora;

    let fechaNueva = new Date(fechaFormateada);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    switch(modo){
      case "lista":
        return fechaHora[0];
        break;
      case "resumen":
        return fechaNueva.toLocaleDateString('es-ES',options);
        break;
    }
    
    
  }

}
