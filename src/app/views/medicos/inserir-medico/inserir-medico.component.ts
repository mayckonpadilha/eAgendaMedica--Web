import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormMedicosWiewModel } from '../models/form-medico.view-model';
import { MedicoService } from '../services/medicos.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss']
})
export class InserirMedicoComponent {

    constructor(private notificationService: NotificationService,private medicoService: MedicoService,private router:Router) {
    }

    gravar(medicoVM: FormMedicosWiewModel){
        this.medicoService.inserir(medicoVM).subscribe({
          next:(res: FormMedicosWiewModel) => this.processarSucesso(res),
          error: (error: Error) => this.processarErro(error)
        })
      }

      processarErro(err: Error): void {
        this.notificationService.erro(`Erro: ${err}`);
  
      }
  
      processarSucesso(res: FormMedicosWiewModel){
        this.notificationService.sucesso(`Medico ${res.nome} adicionado com sucesso!`);
        this.router.navigate(['/medicos', 'listar']);
      }
}
