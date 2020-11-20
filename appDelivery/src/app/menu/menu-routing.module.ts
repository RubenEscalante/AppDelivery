import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
<<<<<<< HEAD
import {MenuSoloPupusasComponent} from './components/menu-solo-pupusas/menu-solo-pupusas.component';

const routes: Routes = [
  { path: '', component: MenuComponent },  
  { path: 'pupusas', component:MenuSoloPupusasComponent}
=======
import {MenuSoloPupusasComponent} from './components/menu/menu-solo-pupusas/menu-solo-pupusas.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path:'categorias', component: MenuSoloPupusasComponent}
>>>>>>> napote
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
