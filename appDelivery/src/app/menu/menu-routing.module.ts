import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {MenuSoloPupusasComponent} from './components/menu/menu-solo-pupusas/menu-solo-pupusas.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path:'categorias', component: MenuSoloPupusasComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
