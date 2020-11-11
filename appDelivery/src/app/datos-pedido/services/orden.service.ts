import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Orden } from '../models/orden';
import { OrdenHistorial } from '../models/orden-historial';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  ordenesList:AngularFireList<any>;
  usuarioList:AngularFireList<any>;
  numeroOrden:number;
  usuario;
  constructor(private firebase:AngularFireDatabase) { 
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.ordenesList = this.firebase.list('/ordenes');
    // this.usuarioList = this.firebase.list('/clientes/'+this.usuario.uid+'/historial');
    this.usuarioList = this.firebase.list('/clientes/'+this.usuario.uid);
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

  guardarOrdenHistorial(ordenes:OrdenHistorial[]){
    // this.usuarioList.set(orden.id,{
    //   id: orden.id,
    //   estado: orden.estado,
    //   fechaCreacion: orden.fechaCreacion,
    //   direccionEnvio: orden.direccionEnvio,
    //   productos: orden.productos,
    //   total: orden.total
    // });
    this.usuarioList.update('historial',ordenes);
  }

  //Esto me salvó la vida, elimina todo el nodo si no especificas un elemento hijo
  eliminar(){
    this.ordenesList.remove();
  }
}

