import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelUsuarioRoutingModule } from './panel-usuario-routing.module';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';


@NgModule({
  declarations: [DatosUsuarioComponent],
  imports: [
    CommonModule,
    PanelUsuarioRoutingModule
  ]
})
export class PanelUsuarioModule { }
