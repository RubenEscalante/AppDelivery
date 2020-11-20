import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { PrincipalComponent } from './components/principal/principal.component';


@NgModule({
  declarations: [ListaClientesComponent, PrincipalComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
