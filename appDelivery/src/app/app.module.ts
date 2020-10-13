<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppComponent } from './app.component';

import { CarritoService } from '../app/carrito/services/carrito.service';
 
=======
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
>>>>>>> ruben


import {PreloadAllModules, RouterModule} from '@angular/router';

import {LayoutModule} from './layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    LayoutModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CarritoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
