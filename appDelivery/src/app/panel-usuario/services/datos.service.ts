import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  datosList:AngularFireList<any>;
  direccionesList:AngularFireList<any>;
  usuario;

  constructor(private firebase:AngularFireDatabase) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.datosList = this.firebase.list('/clientes/'+this.usuario.uid);
  }

  obtenerDirecciones(){
    return this.direccionesList = this.firebase.list('/clientes/'+this.usuario.uid+'/direcciones');
  }
  
  guardarDireccion(direcciones){
    this.datosList.update('direcciones',direcciones);
  }
}
