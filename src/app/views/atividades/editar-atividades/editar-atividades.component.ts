import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FormAtividadesWiewModel } from '../models/form-atividade.view-model';
import { AtividadeService } from '../services/atividade.service';

@Component({
  selector: 'app-editar-atividades',
  templateUrl: './editar-atividades.component.html',
  styleUrls: ['./editar-atividades.component.scss']
})
export class EditarAtividadesComponent  implements OnInit{
  form!: FormGroup;
  idSelecionado:string | null = null;
  atividadeBuscado:any;

  constructor(private notificationService: NotificationService,private route:ActivatedRoute,private formBuilder: FormBuilder,private atividadeService: AtividadeService,private router:Router) {
  }

  ngOnInit(): void {
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(this.idSelecionado == null)
      return;

    this.atividadeBuscado = this.route.snapshot.data['atividade']
    console.clear();
    console.log(this.atividadeBuscado)
    
   }


   gravar(ativiadadeVM: FormAtividadesWiewModel){

    this.atividadeService.editar(this.idSelecionado! , ativiadadeVM).subscribe({
      next:(res: FormAtividadesWiewModel) => this.processarSucesso(res),
      error: (error: Error) => this.processarErro(error)
    }
    )
   }

   
    processarErro(err: Error): void {
      this.notificationService.erro(`Erro: ${err}`);

    }

    processarSucesso(res: FormAtividadesWiewModel){
      this.notificationService.sucesso(`Atividade ${res.assunto} editado com sucesso!`);
      this.router.navigate(['/atividades', 'listar']);
    }
}

