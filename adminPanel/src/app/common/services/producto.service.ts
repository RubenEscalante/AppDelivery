import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Modelo
import {Producto} from '../models/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  datosFirebase:AngularFireList<any>; 

  constructor(private firebase:AngularFireDatabase) { }

  ngOnInit(): void {   
  }

  obtenerIngredientes(){      
    return this.datosFirebase = this.firebase.list('/ingredientes');
  }

  crearPupusa(pupusa:Producto){
    pupusa.categoria="pupusas";
    this.datosFirebase=this.firebase.list('/productos');
    this.datosFirebase.push(pupusa);
  }

}
