import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public total:number;
  public carritoVacio:Boolean;

  constructor() { }

  ngOnInit(): void {
    this.total = 0;
    this.carritoVacio = true;
  }

  recibirTotal(valor){
    this.total = valor;
  }

  estadoCarrito(estado){
    console.log(estado);
    this.carritoVacio = estado;
  }


}
