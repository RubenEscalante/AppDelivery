import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AutentificacionComponent} from './autentificacion/autentificacion.component';


const routes: Routes = [
  { path: '', component: AutentificacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
