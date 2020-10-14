import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ReactiveFormsModule  } from '@angular/forms';

import { ProductosRoutingModule } from './productos-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ModalpupusasComponent } from './modalpupusas/modalpupusas.component';


@NgModule({
  declarations: [PrincipalComponent, ListaProductosComponent, ModalpupusasComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductosModule { }
