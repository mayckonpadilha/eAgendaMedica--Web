import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap,map, Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FormMedicosWiewModel } from '../models/form-medico.view-model';
import { VisualizarMedicosWiewModel } from '../models/visualizacao-completa-medico.view-model';
import { MedicoService } from '../services/medicos.service';

@Component({
  selector: 'app-excluir-medico',
  templateUrl: './excluir-medico.component.html',
  styleUrls: ['./excluir-medico.component.scss']
})
export class ExcluirMedicoComponent implements OnInit{


  medico$!: Observable<VisualizarMedicosWiewModel>;
  
  constructor(private route:ActivatedRoute,private medicoService: MedicoService,private router:Router,
    private notificationService: NotificationService){

  }

  ngOnInit(): void {
    this.medico$ = this.route.data.pipe(map(dado => dado['medico'])); 
    
    }
    
    excluir(){
      this.route.paramMap
        .pipe
        (
          map(params => params.get('id')!),
          switchMap(id => this.medicoService.excluir(id))
        ).subscribe
        ({
          next: res => this.processarSucesso(),
          error: err => this.processarErro(err)
        });


     }

   processarErro(err: Error): void {
    this.notificationService.erro(`Erro: ${err.message}`);
  }

  processarSucesso(){
    this.notificationService.sucesso(`Medico excluido com sucesso!`);
    this.router.navigate(['/medicos', 'listar']);
  }
}
