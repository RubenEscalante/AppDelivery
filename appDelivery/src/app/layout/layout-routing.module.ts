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
      { path: 'menu',
        loadChildren: ()=> import('../menu/menu.module').then(mod => mod.MenuModule)},
      { path: 'carrito',
        loadChildren: ()=> import('../carrito/carrito.module').then(mod => mod.CarritoModule)},
      { path: 'datos-pedido',
        loadChildren: ()=> import('../datos-pedido/datos-pedido.module').then(mod => mod.DatosPedidoModule)}
    ]
  },
  // Enrutamiento para un layout secundario, de ser necesario
  {
    path: '',
    component: SecondaryLayoutComponent,
    children:  [
      { path: 'autentificacion',
        loadChildren: ()=> import('../usuarioauth/sign-in/sign-in.module').then(mod => mod.SignInModule)},
      { path: 'verificar-email',
        loadChildren: ()=> import('../usuarioauth/verificar-email/verificar-email.module').then(mod => mod.VerificarEmailModule)},
      { path: 'clave-perdida',
        loadChildren: ()=> import('../usuarioauth/clave-perdida/clave-perdida.module').then(mod => mod.ClavePerdidaModule)}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
