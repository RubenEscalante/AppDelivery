import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { AutentificacionComponent } from './autentificacion/autentificacion.component';
import { AuthService } from '../services/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [AutentificacionComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignInModule { }
