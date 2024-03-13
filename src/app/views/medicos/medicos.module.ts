import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { MedicoService } from './services/medicos.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { FormMedicoComponent } from './form-medico/form-medico.component';
import 'src/app/extensions/form-group.extension';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component'

@NgModule({
  declarations: [ListarMedicosComponent, InserirMedicoComponent, FormMedicoComponent, EditarMedicoComponent, ExcluirMedicoComponent],
  imports: [
    MedicosRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers:[MedicoService]
})
export class MedicosModule { }
