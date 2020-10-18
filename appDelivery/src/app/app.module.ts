import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppComponent } from './app.component';

import { CarritoService } from '../app/carrito/services/carrito.service';
 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreloadAllModules, RouterModule} from '@angular/router';  

import {LayoutModule} from './layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginmodalComponent } from './autentificacion/loginmodal/loginmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginmodalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    LayoutModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CarritoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
