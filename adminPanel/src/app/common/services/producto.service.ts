import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Preferencias } from '../models/preferencias';

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

  crearProducto(producto:Producto){ 
    this.datosFirebase=this.firebase.list('/productos');
    this.datosFirebase.push(producto);
  }

  obtenerProductos(){
    return this.datosFirebase = this.firebase.list('/productos');
  }

  eliminarProducto(producto){
    this.datosFirebase.remove(producto.id);
  }

  actualizarProducto(producto,id){ 
    if(producto.categoria=="pupusas")
      this.firebase.database.ref('productos/'+id).child('preferencias').set(producto.preferencias);  
    return this.datosFirebase.update(id,{
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      costo: producto.costo
    })    
    
  }  

}
