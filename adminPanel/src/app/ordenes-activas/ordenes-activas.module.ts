import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenesActivasRoutingModule } from './ordenes-activas-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdenesActivasRoutingModule
  ]
})
export class OrdenesActivasModule {  constructor() { console.log('Ordenes called'); }}
