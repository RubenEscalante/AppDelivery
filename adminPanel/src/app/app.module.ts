import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { ReactiveFormsModule  } from '@angular/forms';


import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule} from '@angular/router';  
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
 
// firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask 
} from "@angular/fire/storage";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, //Angular Firebase
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    LayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
