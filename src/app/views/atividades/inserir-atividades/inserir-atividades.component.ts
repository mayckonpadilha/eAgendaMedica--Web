import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FormAtividadesWiewModel } from '../models/form-atividade.view-model';
import { AtividadeService } from '../services/atividade.service';

@Component({
  selector: 'app-inserir-atividades',
  templateUrl: './inserir-atividades.component.html',
  styleUrls: ['./inserir-atividades.component.scss']
})
export class InserirAtividadesComponent {

  constructor(private notificationService: NotificationService,private atividadeService: AtividadeService,private router:Router) {
  }

  gravar(atividadeVM: FormAtividadesWiewModel){
      this.atividadeService.inserir(atividadeVM).subscribe({
        next:(res: FormAtividadesWiewModel) => this.processarSucesso(res),
        error: (error: Error) => this.processarErro(error)
      })
    }

    processarErro(err: Error): void {
      this.notificationService.erro(`Erro: ${err}`);
    }

    processarSucesso(res: FormAtividadesWiewModel){
      this.notificationService.sucesso(`Atividade ${res.assunto} adicionado com sucesso!`);
      this.router.navigate(['/atividades', 'listar']);
    }
}
