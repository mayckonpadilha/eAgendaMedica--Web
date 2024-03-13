import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { FormMedicosWiewModel } from './models/form-medico.view-model';
import { ListarMedicosWiewModel } from './models/listar-medico.view-model';
import { VisualizarMedicosWiewModel } from './models/visualizacao-completa-medico.view-model';
import { MedicoService } from './services/medicos.service';

const formsMedicoResolver: ResolveFn<FormMedicosWiewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(MedicoService).selecionarPorId(route.paramMap.get('id')!)
  };

const listarMedicosResolver: ResolveFn<ListarMedicosWiewModel[]> = () => {
    return inject(MedicoService).selecionarTodos();
  };

const routes: Routes = [
  {
    path:'',
    redirectTo:'listar',
    pathMatch:'full'
  },
  {
    path:'listar',
    component:ListarMedicosComponent,
    resolve: { medicos: listarMedicosResolver}
  },
  {
    path:'inserir',
    component:InserirMedicoComponent
  },
  {
    path:'editar/:id',
    component:EditarMedicoComponent,
    resolve:{ medico: formsMedicoResolver},
  }
  ,
  {
    path:'excluir/:id',
    component:ExcluirMedicoComponent,
    resolve:{ medico: formsMedicoResolver},
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
