import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormMedicosWiewModel } from '../models/form-medico.view-model';
import { MedicoService } from '../services/medicos.service';

@Component({
  selector: 'app-form-medico',
  templateUrl: './form-medico.component.html',
  styleUrls: ['./form-medico.component.scss']
})
export class FormMedicoComponent implements OnInit {

  form!: FormGroup;
  medicoVM!: FormMedicosWiewModel;

  @Input() medicoBuscado: any;
  @Output() onGravar!: EventEmitter<FormMedicosWiewModel | null>;

  constructor(private formBuilder: FormBuilder,private medicoServico:MedicoService,private toastrService:ToastrService){
    this.onGravar = new EventEmitter();
  }  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     nome: new FormControl('',[Validators.required]),
     crm: new FormControl('',[Validators.required])
      });
      
    this.form.patchValue(
        {
          nome : this.medicoBuscado.nome,
          crm:this.medicoBuscado.crm
        }
      );
  
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


    this.medicoVM = this.form.value;

    this.onGravar.emit(this.medicoVM);
  }

}
