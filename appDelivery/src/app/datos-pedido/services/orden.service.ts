import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  ordenes:AngularFireList<any>;
  numeroOrden:number;
  constructor(private firebase:AngularFireDatabase) { 
    this.ordenes = this.firebase.list('ordenes');
  }

  guardarOrden(orden:Orden){
    this.ordenes.update("orden2",{
      descuento: orden.descuento,
      direccionEnvio: orden.direccionEnvio,
      estado: orden.estado,
      fechaCreacion: orden.fechaCreacion,
      id: orden.id,
      productos: orden.productos,
      subtotal: orden.subtotal,
      telefono: orden.telefono,
      total: orden.total,
      usuario: orden.usuario
    })
  }

  //Esto me salvó la vida, elimina todo el nodo si no especificas un elemento hijo
  eliminar(){
    this.ordenes.remove();
  }
}

