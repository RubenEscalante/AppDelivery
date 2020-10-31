import { Injectable, ɵConsole } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
//Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from "@angular/fire/storage";


//Modelo
import {Producto} from '../models/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  datosFirebase:AngularFireList<any>; 

  
  constructor(private firebase:AngularFireDatabase,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {   
  } 


  crearProducto(producto:Producto){ 
    this.datosFirebase=this.firebase.list('/productos');
    this.datosFirebase.push(producto);
  }

  /*TODO:Ya que la imagen se tarda por la conexion hay que poner una pantalla de carga aqui */
  crearProductoImagen(producto:Producto,imagen:File){
    if(!imagen){
      this.crearProducto(producto);
    } 
    else{
      let enlaceDescarga:Observable<string>;
       //Las imagenes se guardan con una estampa de tiempo
      var fecha = Date.now(); 
      const refImagen = `productos/imagen_${fecha}`;      
      const task = this.storage.upload(refImagen, imagen); 
      
      //Subiendo imagen
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            enlaceDescarga = this.storage.ref(refImagen).getDownloadURL();
            enlaceDescarga.subscribe(url => {  
              producto.imagen=url;
              this.crearProducto(producto);
            });
          })
        )
        .subscribe();
    }

  }

  subirImagen(imagen){    
    let enlaceDescarga:Observable<string>;
    //Las imagenes se guardan con una estampa de tiempo
    var fecha = Date.now(); 
    const refImagen = `productos/imagen_${fecha}`;      
    const task = this.storage.upload(refImagen, imagen); 
    
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          enlaceDescarga = this.storage.ref(refImagen).getDownloadURL();
          enlaceDescarga.subscribe(url => { 
            console.log(url);     
            return url;       
          });
        })
      )
      .subscribe();
    
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
