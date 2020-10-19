import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule  } from '@angular/forms';

import { IngredientesRoutingModule } from './ingredientes-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { ListaIngredientesComponent } from './components/lista-ingredientes/lista-ingredientes.component';
import { ProductomodalComponent } from './components/productomodal/productomodal.component';


@NgModule({
  declarations: [PrincipalComponent, ListaIngredientesComponent, ProductomodalComponent],
  imports: [
    CommonModule,
    IngredientesRoutingModule,
    ReactiveFormsModule
  ]
})
export class IngredientesModule { }
