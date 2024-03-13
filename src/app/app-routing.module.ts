import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'medicos',
    loadChildren: () => import('./views/medicos/medicos.module').then((m) => m.MedicosModule)
  },
  {
    path: 'atividades',
    loadChildren: () => import('./views/atividades/atividades.module').then((a) => a.AtividadesModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
