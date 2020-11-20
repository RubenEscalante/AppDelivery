import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from "@angular/fire/storage";

import {Cliente} from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  datosFirebase:AngularFireList<any>;  

  constructor(private firebase:AngularFireDatabase) { }


  obtenerClientes(){
    return this.datosFirebase = this.firebase.list('/clientes');
  }

}
