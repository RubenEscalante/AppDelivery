import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VerificarEmailComponent} from './verificar-email/verificar-email.component';


const routes: Routes = [
  { path: '', component: VerificarEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificarEmailRoutingModule { }
