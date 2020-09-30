import { Component, OnInit } from '@angular/core';
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
  datos = [
    {"codigoProducto":1,"precioProducto":0.50,"cantidad":1,"descripcion":'Pupusa frijol con queso',"fotografia":'aa'},
    {"codigoProducto":2,"precioProducto":1.50,"cantidad":2,"descripcion":'Soda Coca-cola 2.5L',"fotografia":'aa'},
    {"codigoProducto":3,"precioProducto":3.25,"cantidad":3,"descripcion":'Pie de Manzana',"fotografia":'aa'},
    {"codigoProducto":4,"precioProducto":0.5,"cantidad":4,"descripcion":'Pupusa de frijol con queso',"fotografia":'aa'},
  ];
  public productos:Producto[];
  public total:number = 0;
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
  for(let producto of this.productos){
    this.total += producto.precioProducto * producto.cantidad;
  }
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

//Elimina todos los productos del carrito en el componente y en el localStorage
vaciarCarrito(){
  this.productos = null;
  this.carritoService.remove('productos');
  this.total = 0;

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
  if(renderizar){
    //Aquí hago el cambio de pantalla a la página de productos
    //
  }
}

}
