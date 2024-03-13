import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap,Observable } from 'rxjs';
import { ListarMedicosWiewModel } from '../../medicos/models/listar-medico.view-model';
import { FormAtividadesWiewModel } from '../models/form-atividade.view-model';
import { AtividadeService } from '../services/atividade.service';

@Component({
  selector: 'app-form-atividades',
  templateUrl: './form-atividades.component.html',
  styleUrls: ['./form-atividades.component.scss']
})
export class FormAtividadesComponent implements OnInit {
  
  form!: FormGroup;
  atividadeVM!: FormAtividadesWiewModel;
  medicos$?: Observable<ListarMedicosWiewModel[]>
  Ehcirurgia: boolean = false;
  mySelections: string[] = [];
  idsMedicos = new FormControl([],[Validators.required]);
  idsBuscados:string[] = [];



  @Input() atividadeBuscado: any;
  @Output() onGravar!: EventEmitter<FormAtividadesWiewModel | null>;

  constructor(private dateAdapter: DateAdapter<Date>,private formBuilder: FormBuilder,private atividadeService:AtividadeService,private toastrService:ToastrService,private route:ActivatedRoute){
    this.onGravar = new EventEmitter();
    this.dateAdapter.setLocale('en-GB');
  }  
  ngOnInit(): void {

    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']))

    this.obterIdsDosMedicos();

    this.form = this.formBuilder.group({
      assunto: new FormControl('',[Validators.required]),
      dataRealizacao: new FormControl(new Date().toISOString().slice(0,10),[Validators.required]),
      horaInicio: new FormControl(null,[Validators.required]),
      horaTermino: new FormControl(null,[Validators.required]),
      tipoAtividadeEnum: new FormControl(0,[Validators.required]),
      idsMedicos : this.idsMedicos
      });
      
      
    this.form.patchValue(
        {
          assunto : this.atividadeBuscado.assunto,
          dataRealizacao:this.atividadeBuscado.dataRealizacao.slice(0,10),
          horaInicio:this.atividadeBuscado.horaInicio.slice(0,5),
          horaTermino:this.atividadeBuscado.horaTermino.slice(0,5),       
          tipoAtividadeEnum:this.atividadeBuscado.tipoAtividadeEnum,
          idsMedicos:this.idsBuscados,     
        }
      );

  }

  private obterIdsDosMedicos() {
    if (this.atividadeBuscado != null){
      for (let medico of this.atividadeBuscado.medicos) {
        this.idsBuscados.push(medico.id);
      }
    }
  }

  campoInvalido(nome: string){
    return this.form.get(nome)?.invalid && this.form.get(nome)?.touched;
  }
  gravar(){
    if(this.form.invalid){

        const erros = this.form.validate();
        for(let erro of erros){
         this.toastrService.warning(
           erro
         );
        }
        
        return;
     }


    this.atividadeVM = this.form.value;
    this.onGravar.emit(this.atividadeVM);
  }

  mudarParaConsulta(){
    this.idsMedicos.value!.splice(1,Number.MAX_VALUE);
    this.Ehcirurgia = false;
  }

  mudarParaCirurgia(){
    this.Ehcirurgia = true;
  }

  isOptionDisabled(opt: any): boolean {
    return this.idsMedicos.value!.length >= 1 && !this.idsMedicos.value!.find(el => el == opt)
  }

}
