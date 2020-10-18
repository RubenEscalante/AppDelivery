import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelUsuarioRoutingModule } from './panel-usuario-routing.module';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { PasswordComponent } from './components/password/password.component';
import { DireccionComponent } from './components/direccion/direccion.component';


@NgModule({
  declarations: [DatosUsuarioComponent, PasswordComponent, DireccionComponent],
  imports: [
    CommonModule,
    PanelUsuarioRoutingModule
  ]
})
export class PanelUsuarioModule { }
