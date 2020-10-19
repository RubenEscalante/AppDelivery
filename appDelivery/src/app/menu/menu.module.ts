import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {MenuRoutingModule} from './menu-routing.module';
import {MenuComponent} from './components/menu/menu.component';
import { FiltrosComponent } from './components/menu/filtros/filtros.component';
import { ListaProductosComponent } from './components/menu/lista-productos/lista-productos.component';
import { ProductoItemComponent } from './components/menu/lista-productos/producto-item/producto-item.component';
import { ProductoModalComponent } from './components/menu/lista-productos/producto-item/producto-modal/producto-modal.component';
import { FiltroPipe } from './Pipes/filtro.pipe';
import { PaginacionPipe } from './Pipes/paginacion.pipe';
import {ProductlistService} from './services/productlist.service';
import {ProductfilterService} from './services/productfilter.service';
import {MenucartService} from './services/menucart.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';



@NgModule({
  declarations: [
    MenuComponent,
    FiltrosComponent,
    ListaProductosComponent,
    ProductoItemComponent,
    ProductoModalComponent,
    FiltroPipe,
    PaginacionPipe


  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

  ],
  providers: [ProductlistService, ProductfilterService, MenucartService],

})
export class MenuModule {
}
