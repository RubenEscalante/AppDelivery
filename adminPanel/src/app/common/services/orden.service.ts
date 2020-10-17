import { Injectable } from '@angular/core';  
import { formatDate, registerLocaleData} from '@angular/common'
import localeSV from '@angular/common/locales/es-SV';
registerLocaleData(localeSV, 'es-SV');
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//Modelo
import {Orden} from '../models/orden';
 

@Injectable({
  providedIn: 'root'
})

export class OrdenService{ 

  datosFirebase:AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) { }

  fechaEntrega:Date = new Date();
  
   
  //Obteniendo ordenes del Servidor
  obtenerOrdenes(){  
    return this.datosFirebase = this.firebase.list('ordenes'); 
  }
  
  //Buscar Orden por estado
  filtrarOrdenesEstado(){

  }

  //Cuando sea necesario actualizar el estado de la orden seleccionada
  actualizarEstado(orden:Orden){      
    return this.datosFirebase.update(orden.id,{
      estado: orden.estado 
      })    
  }

  moverHistorial(orden:Orden){
    this.datosFirebase=this.firebase.list('historial');
    this.datosFirebase.set(orden.id, {
      descuento: orden.descuento,
      direccionEnvio: orden.direccionEnvio,
      estado: orden.estado,
      fechaCreacion: orden.fechaCreacion,
      fechaEntrega: formatDate(this.fechaEntrega, 'short', 'es-SV'),
      productos: orden.productos,
      subtotal: orden.subtotal,
      total: orden.total,
      usuario: orden.usuario
    });

    //this.eliminarPedido(orden.id);

  }

  eliminarPedido(idOrden:string){
    this.datosFirebase=this.firebase.list('ordenes');
    this.datosFirebase.remove(idOrden);
  }

}
