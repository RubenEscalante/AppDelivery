import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TuPupusaComponent} from './tu-pupusa/tu-pupusa.component';


const routes: Routes = [
  { path: '', component: TuPupusaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuPupusaRoutingModule { }
