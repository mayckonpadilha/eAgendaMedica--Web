import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirMedicoComponent } from '../medicos/inserir-medico/inserir-medico.component';
import { ListarMedicosWiewModel } from '../medicos/models/listar-medico.view-model';
import { MedicoService } from '../medicos/services/medicos.service';
import { EditarAtividadesComponent } from './editar-atividades/editar-atividades.component';
import { ExcluirAtividadesComponent } from './excluir-atividades/excluir-atividades.component';
import { FormAtividadesComponent } from './form-atividades/form-atividades.component';
import { InserirAtividadesComponent } from './inserir-atividades/inserir-atividades.component';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { ListarAtividadesWiewModel } from './models/listar-atividade.view-model';
import { VisualizarAtividadeViewModel } from './models/visualizacao-completa-medico.view-model';
import { AtividadeService } from './services/atividade.service';

const listarAtividadesResolver: ResolveFn<ListarAtividadesWiewModel[]> = () => {
  return inject(AtividadeService).selecionarTodos();
};

const listarMedicosResolver: ResolveFn<ListarMedicosWiewModel[]> = () => {
  return inject(MedicoService).selecionarTodos();
};

const formsAtividadeResolver: ResolveFn<VisualizarAtividadeViewModel> =  
  (route: ActivatedRouteSnapshot) => 
  {
    return inject(AtividadeService).selecionarPorId(route.paramMap.get('id')!)
  };

const routes: Routes = [  
  {
  path:'',
  redirectTo:'listar',
  pathMatch:'full'
  },
  {
    path:'listar',
    component:ListarAtividadesComponent,
    resolve: { atividades: listarAtividadesResolver,}
  },
  {
    path:'inserir',
    component:InserirAtividadesComponent,
    resolve: { medicos: listarMedicosResolver}
  },
  {
    path:'editar/:id',
    component:EditarAtividadesComponent,
    resolve:{ atividade: formsAtividadeResolver,
              medicos: listarMedicosResolver
            },
  },  
  {
    path:'excluir/:id',
    component:ExcluirAtividadesComponent,
    resolve:{ atividade: formsAtividadeResolver},
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadesRoutingModule { }
