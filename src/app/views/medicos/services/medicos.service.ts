import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map,tap, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormMedicosWiewModel } from "../models/form-medico.view-model";
import { ListarMedicosWiewModel } from "../models/listar-medico.view-model";

@Injectable()

export class MedicoService{
    private API_URL = `${environment.API_URL}medicos`;

     constructor(private http: HttpClient) {}

     public inserir(medico: FormMedicosWiewModel): Observable<FormMedicosWiewModel>{
      return this.http.post<any>(this.API_URL,medico).pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)))
      
     }

    public editar(id:string, medico: FormMedicosWiewModel): Observable<FormMedicosWiewModel>{
      return this.http.put<any>(this.API_URL + "/"+id, medico)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) =>this.processarErroHttp(err)))
      }

    public excluir(id:string){
        return this.http.delete<any>(this.API_URL + '/'+id)
        .pipe(map(res => res),
         catchError((err: HttpErrorResponse) =>this.processarErroHttp(err)))
       
      }

     selecionarTodos(): Observable<ListarMedicosWiewModel[]> {
      return this.http.get<any>(this.API_URL).pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
    }

    public selecionarPorId(id: string){
      return this.http.get<any>(this.API_URL + "/visualizacao-completa/"+id )
      .pipe(
        map((res) => res.dados),
        tap((res) => {console.clear();console.log(res)}),
      catchError((err: HttpErrorResponse) =>this.processarErroHttp(err)))
    }


    selecionarTop10(dataInicio:Date,dataLimite:Date): Observable<ListarMedicosWiewModel[]> {

      const dataHoje = dataInicio.toISOString().substring(0, 10);
      const dataFim = dataLimite.toISOString().substring(0, 10);

      return this.http.get<any>(this.API_URL+ `/selecionar-top-10-medicos?${dataHoje}=${dataFim}`).pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
    }

  private processarErroHttp(erro: HttpErrorResponse) {
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro =
        'O usuário não está autorizado. Efetue login e tente novamente.';
    else mensagemErro = erro.error?.erros[0];
    console.log(mensagemErro);

    return throwError(() => new Error(mensagemErro));
  }
}