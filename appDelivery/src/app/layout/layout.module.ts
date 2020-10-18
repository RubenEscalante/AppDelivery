import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'; 
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SecondaryLayoutComponent } from './components/secondary-layout/secondary-layout.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent,  MainLayoutComponent, SecondaryLayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
