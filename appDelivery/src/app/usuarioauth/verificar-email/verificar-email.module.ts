import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificarEmailRoutingModule } from './verificar-email-routing.module';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';


@NgModule({
  declarations: [VerificarEmailComponent],
  imports: [
    CommonModule,
    VerificarEmailRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class VerificarEmailModule { }
