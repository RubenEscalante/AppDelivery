import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//Modelo
import { Producto } from '../../models/producto';

//Servicio
import { CarritoService } from '../../services/carrito.service';
import { MenucartService } from '../../../menu/services/menucart.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  public productos;
  public total:number = 0;
  public cantidad:number = 0;
  @Output() enviarTotal = new EventEmitter();
  @Output() carritoVacio = new EventEmitter();

  constructor(
    private carritoService:CarritoService,
    public menuServicio:MenucartService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.productos = this.carritoService.get('cart');
    console.log(this.productos);
    this.obtenerTotal();
  }

 //Calculo el total de la compra
 obtenerTotal(){

  /*this.total = 0;
  if(this.productos){
    for(let producto of this.productos){
      this.total += producto.price * producto.quantity;
    }
    this.carritoVacio.emit(false);
  }*/

  this.guardarCambios();
  this.total = this.menuServicio.getCartTotal();
  if(this.productos == null || this.productos.length == 0){
    this.carritoVacio.emit(true);
  }else{
    this.carritoVacio.emit(false);
  }
  this.enviarTotal.emit(this.total);

}

//Elimina un solo producto
eliminarProducto(productoEliminado:Producto){
  let indice = this.productos.indexOf(productoEliminado);
  this.productos.splice(indice,1);

  //Calculando el total nuevamente
  this.obtenerTotal();

  //Mostrando toast
  this.toastr.warning('Producto eliminado exitosamente', 'Producto Eliminado',{
    progressBar: true,
    timeOut: 1500,
    closeButton: true
  });

  //Revisar si el carrito está vacio
  if(this.productos.length == 0){
    this.productos = null;
  }
}

//Incrementa en uno la cantidad del producto
incrementarCantidad(producto){
  if(producto.cantidad < 50){
    producto.cantidad++;
  }else{
    //Aqui puedo mostrar un mensaje de error
    producto.cantidad = 50;
  }
  let indice = this.productos.indexOf(producto);
  this.productos.splice(indice,1,producto);
  this.obtenerTotal();
}

//Decrementa en uno la cantidad del producto
decrementarCantidad(producto){
  if(producto.cantidad > 1){
    producto.cantidad--;
  }else{
    //Aqui puedo mostrar un mensaje de error al usuario
    producto.cantidad = 1;
  }
  let indice = this.productos.indexOf(producto);
  this.productos.splice(indice,1,producto);
  this.obtenerTotal();

}

//Elimina todos los productos del carrito en el componente y en el localStorage
vaciarCarrito(){
  this.productos = null;
  this.carritoService.remove('cart');
  this.total = 0;
  this.enviarTotal.emit(this.total);

  //Mostrando toast
  this.toastr.warning('Productos eliminados del carrito exitosamente', 'Carrito Vaciado',{
    progressBar: true,
    timeOut: 1500,
    closeButton: true
  });

  this.guardarCambios();
  this.carritoVacio.emit(true);
}

//Guarda cambios en el localStorage
guardarCambios(renderizar?:string){

  //Con esto almaceno los cambios realizados en las cantidades y los productos eliminados en el localStorage
  this.carritoService.set('cart',this.productos);
  if(renderizar){
    //Aquí hago el cambio de pantalla a la página de productos
    //
  }
}

cantidadIngredientes(producto, index):Boolean{
  if(producto.categoria == "pupusas"){
    let cantidad = Object.keys(producto.preferencias['ingredientes']).length;
    if(index < cantidad - 1){
      return true;
    }else{
      return false;
    }
  }
}

}
