import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
  
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', 
        loadChildren: ()=> import('../dashboard/dashboard.module').then(mod => mod.DashboardModule)},  
      { path: 'ordenes-activas', 
        loadChildren: ()=> import('../ordenes-activas/ordenes-activas.module').then(mod => mod.OrdenesActivasModule)},  
      { path: 'ingredientes',
        loadChildren: ()=> import('../ingredientes/ingredientes.module').then(mod=>mod.IngredientesModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
