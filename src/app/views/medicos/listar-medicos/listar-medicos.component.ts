import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ListarMedicosWiewModel } from '../models/listar-medico.view-model';
import { MedicoService } from '../services/medicos.service';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.scss']
})
export class ListarMedicosComponent implements OnInit{
  
  medicos$?: Observable<ListarMedicosWiewModel[]>


  constructor(private route:ActivatedRoute,private medicoService:MedicoService){}


  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']))
  }

}
