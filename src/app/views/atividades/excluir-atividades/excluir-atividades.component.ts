import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { VisualizarAtividadeViewModel } from '../models/visualizacao-completa-medico.view-model';
import { AtividadeService } from '../services/atividade.service';

@Component({
  selector: 'app-excluir-atividades',
  templateUrl: './excluir-atividades.component.html',
  styleUrls: ['./excluir-atividades.component.scss']
})
export class ExcluirAtividadesComponent  implements OnInit{


  atividade$!: Observable<VisualizarAtividadeViewModel>;
  
  constructor(private route:ActivatedRoute,private atividadesService: AtividadeService,private router:Router,
    private notificationService: NotificationService){

  }

  ngOnInit(): void {
    this.atividade$ = this.route.data.pipe(map(dado => dado['atividade'])); 
    
    }
    
    excluir(){
      this.route.paramMap
        .pipe
        (
          map(params => params.get('id')!),
          switchMap(id => this.atividadesService.excluir(id))
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
    this.notificationService.sucesso(`Atividade excluida com sucesso!`);
    this.router.navigate(['/atividades', 'listar']);
  }
}

