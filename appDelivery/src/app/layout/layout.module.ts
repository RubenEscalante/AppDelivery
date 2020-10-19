import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'; 
import { MainLayoutComponent } from './components/main-layout/main-layout.component'; 


@NgModule({
  declarations: [HeaderComponent, FooterComponent,  MainLayoutComponent ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
