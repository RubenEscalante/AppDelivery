import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Modelo
import {Ingrediente} from '../models/ingrediente';



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


}
