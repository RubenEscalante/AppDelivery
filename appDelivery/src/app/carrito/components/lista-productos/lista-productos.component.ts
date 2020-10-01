import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

//Modelo
import { Producto } from '../../models/producto';

//Servicio
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  public productos:Producto[];
  public total:number = 0;
  public cantidad:number = 0;
  @Output() enviarTotal = new EventEmitter();
  constructor(
    private carritoService:CarritoService
  ) { }

  ngOnInit(): void {
    this.productos = this.carritoService.get('productos');
    this.obtenerTotal();
  }

 //Calculo el total de la compra
 obtenerTotal(){
  this.total = 0;
  if(this.productos){
    for(let producto of this.productos){
      this.total += producto.precioProducto * producto.cantidad;
    }
  }
  
  this.enviarTotal.emit(this.total);
  this.guardarCambios();
}

//Elimina un solo producto
eliminarProducto(productoEliminado:Producto){
  let indice = this.productos.indexOf(productoEliminado);
  this.productos.splice(indice,1);
  
  //Calculando el total nuevamente
  this.obtenerTotal();

  //Mostrando toast
  /*this.toastr.warning('Producto eliminado exitosamente', 'Producto Eliminado',{
    progressBar: true,
    timeOut: 1500,
    closeButton: true
  });*/

  //Revisar si el carrito está vacio
  if(this.productos.length == 0){
    this.productos = null;
  }
}

//Incrementa en uno la cantidad del producto
incrementarCantidad(producto:Producto){
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
decrementarCantidad(producto:Producto){
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
  this.carritoService.remove('productos');
  this.total = 0;
  this.enviarTotal.emit(this.total);

  //Mostrando toast
  /*this.toastr.warning('Productos eliminados del carrito exitosamente', 'Carrito Vaciado',{
    progressBar: true,
    timeOut: 1500,
    closeButton: true
  });*/
}

//Guarda cambios en el localStorage
guardarCambios(renderizar?:string){
  
  //Con esto almaceno los cambios realizados en las cantidades y los productos eliminados en el localStorage
  this.carritoService.set('productos',this.productos);
  this.carritoService.set('total',this.total);
  this.carritoService.set('cantidadProductos',this.productos.length);
  if(renderizar){
    //Aquí hago el cambio de pantalla a la página de productos
    //
  }
}

}
