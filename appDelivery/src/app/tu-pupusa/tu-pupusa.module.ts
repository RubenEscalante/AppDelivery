import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuPupusaRoutingModule } from './tu-pupusa-routing.module';
import { TuPupusaComponent } from './tu-pupusa/tu-pupusa.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [TuPupusaComponent],
  imports: [
    CommonModule,
    TuPupusaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TuPupusaModule { }
