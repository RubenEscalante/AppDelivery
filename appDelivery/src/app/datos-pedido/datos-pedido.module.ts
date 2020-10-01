import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosPedidoRoutingModule } from './datos-pedido-routing.module';
import { DatosComponent } from './components/datos/datos.component';
import { CarritoComponent } from './components/carrito/carrito.component';


@NgModule({
  declarations: [DatosComponent, CarritoComponent],
  imports: [
    CommonModule,
    DatosPedidoRoutingModule
  ]
})
export class DatosPedidoModule { }
