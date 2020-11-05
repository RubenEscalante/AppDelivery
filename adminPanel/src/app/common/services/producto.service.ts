import { Injectable, ɵConsole } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from "@angular/fire/storage";


//Modelo
import {Producto} from '../models/producto';
import { Imagen } from '../models/imagen';
import { runInThisContext } from 'vm';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  datosFirebase:AngularFireList<any>; 

  
  constructor(private firebase:AngularFireDatabase,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {   
  } 


  //*TODO: Esta funcion ya no es necesaria para crear un postre/bebida, pero pupusas la necesita
  crearProducto(producto:Producto){ 
    this.datosFirebase=this.firebase.list('/productos'); 
    var ref =  this.datosFirebase.push(producto); 
  }


  /*TODO:Ya que la imagen se tarda por la conexion hay que poner una pantalla de carga aqui */
  crearProductoImagen(producto,imagen:File){ 
    this.datosFirebase = this.firebase.list('/productos');
    var ref = this.datosFirebase.push(producto);

    if(imagen){ 
      producto.id = ref.key; 
      this.subirImagen(producto, imagen);
    }     

  }
  

  obtenerProductos(){
    return this.datosFirebase = this.firebase.list('/productos');
  }

  //Elimina el producto y si existe, su imagen.
  eliminarProducto(producto){
    if(producto.imagen)
      this.storage.storage.refFromURL(producto.imagen.url).delete();
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

  //Sube una imagen a firebase storage
  subirImagen(producto, imagen){    
    if(!imagen)
      return

    let enlaceDescarga:Observable<string>;
    var fecha = Date.now(); 
    const refImagen = `productos/imagen_${fecha}`;      
    const task = this.storage.upload(refImagen, imagen); 
    
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          enlaceDescarga = this.storage.ref(refImagen).getDownloadURL();
          enlaceDescarga.subscribe(url => { 
            producto.imagen = new Imagen();
            producto.imagen.url=url;
            producto.imagen.ref = refImagen;
            this.firebase.database.ref('productos/'+producto.id).child('imagen').set(producto.imagen);  
          });
        })
      )
      .subscribe();
    
  }
 
  //Actualiza una imagen existente 
  actualizarImagen(producto,imagenNueva){  
    if(producto.imagen){
      this.firebase.database.ref('productos/'+producto.id).child('imagen').remove();   
      this.storage.storage.refFromURL(producto.imagen.url).delete();
    }
    
    this.subirImagen(producto,imagenNueva);   
     
  }






}
