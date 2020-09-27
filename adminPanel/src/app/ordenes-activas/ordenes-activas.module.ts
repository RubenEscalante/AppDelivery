import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPedidosComponent } from './components/lista-pedidos/lista-pedidos.component'; 

import { OrdenesActivasRoutingModule } from './ordenes-activas-routing.module'; 
import { PrincipalComponent } from './components/principal/principal.component';


@NgModule({
  imports: [
    CommonModule,
    OrdenesActivasRoutingModule
  ], 
  declarations: [ListaPedidosComponent, PrincipalComponent] 
  
})


export class OrdenesActivasModule { }
