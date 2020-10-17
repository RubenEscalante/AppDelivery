import { Component, OnInit } from '@angular/core';

import { CarritoService } from '../../../carrito/services/carrito.service';
import { MenucartService } from '../../../menu/services/menucart.service';

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
    private carritoServicio:CarritoService,
    private menucartServicio:MenucartService
  ) { }

  ngOnInit(): void {
    this.productos = this.carritoServicio.get('cart');
    this.total = this.menucartServicio.getCartTotal();
    this.cantidad = this.menucartServicio.getCartLength();
  }

}
