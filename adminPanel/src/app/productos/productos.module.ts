import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';

import { ProductosRoutingModule } from './productos-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ModalpupusasComponent } from './modalpupusas/modalpupusas.component';
import { ModalotrosproductosComponent } from './modalotrosproductos/modalotrosproductos.component';


@NgModule({
  declarations: [PrincipalComponent, ListaProductosComponent, ModalpupusasComponent, ModalotrosproductosComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductosModule { }
