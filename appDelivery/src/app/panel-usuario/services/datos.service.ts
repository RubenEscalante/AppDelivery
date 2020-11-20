import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  datosList:AngularFireList<any>;
  direccionesList:AngularFireList<any>;
  historialList:AngularFireList<any>;
  ordenesList:AngularFireList<any>;
  usuario;

  constructor(private firebase:AngularFireDatabase) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.datosList = this.firebase.list('/clientes/'+this.usuario.uid);
  }

  obtenerDirecciones(){
    return this.direccionesList = this.firebase.list('/clientes/'+this.usuario.uid+'/direcciones');
  }

  obtenerHistorial(){
    return this.historialList = this.firebase.list('/clientes/'+this.usuario.uid+'/historial');
  }

  obtenerOrdenes(){
    return this.ordenesList = this.firebase.list('/ordenes');
  }
  
  guardarDireccion(direcciones){
    this.datosList.update('direcciones',direcciones);
  }

  eliminarDireccion(direcciones){
    this.datosList.set('direcciones',direcciones);
  }

  guardarHistorial(historial){
    this.datosList.update('historial',historial);
  }

  guardarTelefono(telefono){
    this.datosList.set('telefono',telefono);
  }
}
