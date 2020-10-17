import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClavePerdidaRoutingModule } from './clave-perdida-routing.module';
import { ClavePerdidaComponent } from './clave-perdida/clave-perdida.component';


@NgModule({
  declarations: [ClavePerdidaComponent],
  imports: [
    CommonModule,
    ClavePerdidaRoutingModule
  ]
})
export class ClavePerdidaModule { }
