import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Modelo
import {Ingrediente} from '../models/ingrediente';


@Injectable({
  providedIn: 'root'
})
export class IngredientesService {
  datosFirebase:AngularFireList<any>; 


  constructor(private firebase:AngularFireDatabase) { }

  ngOnInit(): void {   
  }

  obtenerIngredientes(){      
    return this.datosFirebase = this.firebase.list('/ingredientes');
  }

  //Crea un nuevo ingrediente
  crearIngrediente(ingrediente:Ingrediente){   
    this.datosFirebase=this.firebase.list('/ingredientes');
    this.datosFirebase.push({  
        nombre:ingrediente.nombre,
        costo:ingrediente.costo
      })  
  } 



}
