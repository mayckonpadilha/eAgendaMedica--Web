import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicosModule } from '../medicos/medicos.module';
import { NgChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
     DashboardRoutingModule,
      SharedModule,
      MedicosModule,
      NgChartsModule
    ],
})
export class DashboardModule { }
