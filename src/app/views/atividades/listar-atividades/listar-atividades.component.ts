import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ListarAtividadesWiewModel } from '../models/listar-atividade.view-model';

@Component({
  selector: 'app-listar-atividades',
  templateUrl: './listar-atividades.component.html',
  styleUrls: ['./listar-atividades.component.scss']
})
export class ListarAtividadesComponent implements OnInit{
  
  atividades$?: Observable<ListarAtividadesWiewModel[]>

  constructor(private route:ActivatedRoute){}


  ngOnInit(): void {
    this.atividades$ = this.route.data.pipe(map(dados => dados['atividades']))
  }
}
