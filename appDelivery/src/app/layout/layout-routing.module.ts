import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthGuard} from '../guard/auth.guard';
import { SessionGuard} from '../guard/session.guard';

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
        loadChildren: ()=> import('../carrito/carrito.module').then(mod => mod.CarritoModule),
        canActivateChild: [AuthGuard]},
      { path: 'datos-pedido',
        loadChildren: ()=> import('../datos-pedido/datos-pedido.module').then(mod => mod.DatosPedidoModule),
        canActivateChild: [AuthGuard]},
      { path: 'perfil-usuario',
        loadChildren: ()=> import('../panel-usuario/panel-usuario.module').then(mod => mod.PanelUsuarioModule),
        canActivateChild: [AuthGuard]},
      { path: 'registro',
        loadChildren: ()=> import('../autentificacion/sign-in/sign-in.module').then(mod => mod.SignInModule),
        canActivateChild: [SessionGuard]},
      { path: 'verificar-email',
        loadChildren: ()=> import('../autentificacion/verificar-email/verificar-email.module').then(mod => mod.VerificarEmailModule),
        canActivateChild: [AuthGuard]},
      { path: 'clave-perdida',
        loadChildren: ()=> import('../autentificacion/clave-perdida/clave-perdida.module').then(mod => mod.ClavePerdidaModule),
        canActivateChild: [SessionGuard]}
    ]
  }];
   

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
