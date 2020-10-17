import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  ordenesList:AngularFireList<any>;
  numeroOrden:number;
  constructor(private firebase:AngularFireDatabase) { 
    this.ordenesList = this.firebase.list('/ordenes');
  }

  guardarOrden(orden:Orden){
    this.ordenesList.update(orden.id,{
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
    this.ordenesList.remove();
  }
}

