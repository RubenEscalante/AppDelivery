import { Component, OnInit } from '@angular/core';

//Componentes para mostrar modal
import {  NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalotrosproductosComponent } from '../modalotrosproductos/modalotrosproductos.component';
import { ModalpupusasComponent } from '../modalpupusas/modalpupusas.component';

//Service
import { ProductoService } from '../../common/services/producto.service';

//Modelo
import { Producto } from '../../common/models/producto';
import { element } from 'protractor';



@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor(
    private productosServicio:ProductoService,
    private modalService: NgbModal
  ) { }

  listaProductos:Producto[];
 

  ngOnInit(){
    return this.productosServicio.obtenerProductos().snapshotChanges().subscribe(item=>{
      this.listaProductos = [];
      item.forEach(element =>{
        let x =element.payload.toJSON();
        x["id"]=element.key;
        this.listaProductos.push(x as Producto);
      });
    }); 
  }

  eliminarProducto(producto:Producto){
    this.productosServicio.eliminarProducto(producto);
  }

  modificarProducto(producto:Producto){
    if(producto.categoria=="pupusas")
      this.abrirModalPupusas(producto);
    else 
      this.abrirModalOtrosProductos(producto);
  }

  abrirModalPupusas(producto){
    const modalRef =this.modalService.open(ModalpupusasComponent, {size:<any>'xl'}); 
    modalRef.componentInstance.idParaModificar=producto.id; 
    modalRef.componentInstance.pupusaParaModificar=producto;   

  }

  abrirModalOtrosProductos(producto){
    const modalRef =this.modalService.open(ModalotrosproductosComponent, {size:<any>'lg'}); 
    modalRef.componentInstance.idParaModificar=producto.id; 
    modalRef.componentInstance.productoParaModificar=producto;   
  }

}
