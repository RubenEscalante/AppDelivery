import { Injectable } from '@angular/core';  

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
   
  //Obteniendo ordenes del Servidor
  obtenerOrdenes(){  
    return this.datosFirebase = this.firebase.list('orders'); 
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



}
