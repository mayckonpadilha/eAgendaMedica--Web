import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData} from '@angular/common';

import { AtividadesRoutingModule } from './atividades-routing.module';
import 'src/app/extensions/form-group.extension';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { AtividadeService } from './services/atividade.service';
import { InserirAtividadesComponent } from './inserir-atividades/inserir-atividades.component';
import { FormAtividadesComponent } from './form-atividades/form-atividades.component';
import { MedicosModule } from '../medicos/medicos.module';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_FORMATS ,DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { MomentDateAdapter } from '@angular/material-moment-adapter';

import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { EditarAtividadesComponent } from './editar-atividades/editar-atividades.component';
import { ExcluirAtividadesComponent } from './excluir-atividades/excluir-atividades.component';  

registerLocaleData(localePt);

@NgModule({
  declarations: [
    ListarAtividadesComponent,
    InserirAtividadesComponent,
    FormAtividadesComponent,
    EditarAtividadesComponent,
    ExcluirAtividadesComponent
  ],
  imports: [
    AtividadesRoutingModule,
    SharedModule,
    HttpClientModule,
    MedicosModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule.setLocale('pt-BR')
  ],
  providers:[AtividadeService,    
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class AtividadesModule { }
