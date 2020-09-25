import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdenesActivasComponent} from './ordenes-activas.component';

const routes: Routes = [
  { path: '', component: OrdenesActivasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesActivasRoutingModule { }
