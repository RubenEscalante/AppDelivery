import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';


const routes: Routes = [
  {path:'', component:DatosUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelUsuarioRoutingModule { }
