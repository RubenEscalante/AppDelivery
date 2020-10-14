import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule} from '@angular/router';  
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
 
// firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, //Angular Firebase
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
