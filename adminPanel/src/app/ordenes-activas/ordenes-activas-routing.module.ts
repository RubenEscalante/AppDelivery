import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
import {ListaPedidosComponent} from './components/lista-pedidos/lista-pedidos.component';
import {PrincipalComponent} from './components/principal/principal.component';


const routes: Routes = [
  { path: '', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesActivasRoutingModule { }
