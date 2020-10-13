import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SecondaryLayoutComponent} from './components/secondary-layout/secondary-layout.component';

// Enrutamiento para el layout principal, compartido por el carrito de compras, el menu...
const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
<<<<<<< HEAD
      { path: 'menu', 
        loadChildren: ()=> import('../menu/menu.module').then(mod => mod.MenuModule)},  
      { path: 'carrito', 
        loadChildren: ()=> import('../carrito/carrito.module').then(mod => mod.CarritoModule)},
      { path: 'datos-pedido', 
        loadChildren: ()=> import('../datos-pedido/datos-pedido.module').then(mod => mod.DatosPedidoModule)}  
=======
      { path: 'menu',
        loadChildren: () => import('../menu/menu.module').then(mod => mod.MenuModule)},
      { path: 'carrito',
        loadChildren: () => import('../carrito/carrito.module').then(mod => mod.CarritoModule)},
>>>>>>> ruben

    ]
  },
  // Enrutamiento para un layout secundario, de ser necesario
  {
    path: '',
    component: SecondaryLayoutComponent,
    children:  []
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
