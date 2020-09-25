import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
//Routing
import { LayoutRoutingModule } from './layout-routing.module';

//Componentes
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component'; 

//import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, FooterComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule//,
    //FlexLayoutModule
  ],
  exports:[]
})
export class LayoutModule { }
