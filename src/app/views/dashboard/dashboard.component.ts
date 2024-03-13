import { Component, OnInit } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { ChartDataset, ChartType,Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { ListarMedicosWiewModel } from '../medicos/models/listar-medico.view-model';
import { MedicoService } from '../medicos/services/medicos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public chart: any;
  public medicos$?: Observable<ListarMedicosWiewModel[]>
  public medicos:any[] = [];
  public medicosEmAtivide:any[] = [];
  public medicosComHorasMarcadas:any[] = [];

  constructor(private medicoService:MedicoService){

  }

  ngOnInit(): void {
    var dataTeste:Date = new Date();
    dataTeste.setHours(72);
    this.medicos$ = this.medicoService.selecionarTodos();

    this.medicos$.subscribe((m =>{
      this.medicos = m;
      console.log(m); 
      for(let medico of m){
        if(medico.emAtividade == true){
          this.medicosEmAtivide.push(medico);
        }
        if(medico.horasOcupadas.length > 0){
          this.medicosComHorasMarcadas.push(medico);
        }
      }
      this.criarTabela();
      
    } ));

  }


  private criarTabela() {
    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: [
        'Medicos Cadastrados'],

        datasets: [
          {
            label: "Medicos Me Atividade",
            data: [ this.medicosEmAtivide.length,],
            backgroundColor: 'cyan'
          },
          {
            label: "Total de Medicos",
            data: [ this.medicos.length],
            backgroundColor: 'Aquamarine'
          }
          ,
          {
            label: "Medicos com horas registradas",
            data: [ this.medicosComHorasMarcadas.length],
            backgroundColor: 'Coral'
          }
        ]

      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
