import { Component, OnInit } from '@angular/core';

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
    private productosServicio:ProductoService
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

}
