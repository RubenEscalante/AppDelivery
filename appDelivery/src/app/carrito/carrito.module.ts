import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';


@NgModule({
  declarations: [CarritoComponent, ListaProductosComponent],
  imports: [
    CommonModule,
    CarritoRoutingModule
  ]
})
export class CarritoModule { }
