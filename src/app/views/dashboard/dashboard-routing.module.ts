import { inject, NgModule } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicosWiewModel } from '../medicos/models/listar-medico.view-model';
import { MedicoService } from '../medicos/services/medicos.service';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
