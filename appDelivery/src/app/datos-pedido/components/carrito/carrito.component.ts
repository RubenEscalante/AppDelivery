import { Component, OnInit } from '@angular/core';

import { CarritoService } from '../../../carrito/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public productos;
  public total;
  public cantidad;
  constructor(
    private carritoServicio:CarritoService
  ) { }

  ngOnInit(): void {
    this.productos = this.carritoServicio.get('productos');
    this.total = this.carritoServicio.get('total');
    this.cantidad = this.carritoServicio.get('cantidadProductos');
  }

}
