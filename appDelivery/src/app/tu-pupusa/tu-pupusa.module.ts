import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuPupusaRoutingModule } from './tu-pupusa-routing.module';
import { TuPupusaComponent } from './tu-pupusa/tu-pupusa.component';


@NgModule({
  declarations: [TuPupusaComponent],
  imports: [
    CommonModule,
    TuPupusaRoutingModule
  ]
})
export class TuPupusaModule { }
