import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClavePerdidaComponent} from './clave-perdida/clave-perdida.component';


const routes: Routes = [
  { path: '', component: ClavePerdidaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClavePerdidaRoutingModule { }
