import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routing
import { LayoutRoutingModule } from './layout-routing.module';


import { Global } from '../common/global';

//Componentes 
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component'; 

//import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule//,
    //FlexLayoutModule
  ],
  providers:[Global],
  exports:[]
})
export class LayoutModule { }
