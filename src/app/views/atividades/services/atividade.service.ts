import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map,tap, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormAtividadesWiewModel } from "../models/form-atividade.view-model";
import { ListarAtividadesWiewModel } from "../models/listar-atividade.view-model";

@Injectable()

export class AtividadeService{

    private API_URL = `${environment.API_URL}atividades`;

     constructor(private http: HttpClient) {}

     selecionarTodos(): Observable<ListarAtividadesWiewModel[]> {
        return this.http.get<any>(this.API_URL).pipe(
          map((res) => res.dados),
          catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
        );
      }

      public inserir(atividade: FormAtividadesWiewModel): Observable<FormAtividadesWiewModel>{
        return this.http.post<any>(this.API_URL,atividade).pipe(
          map((res) => res.dados),
          catchError((err: HttpErrorResponse) => this.processarErroHttp(err)))
        
       }

      public editar(id:string, atividade: FormAtividadesWiewModel): Observable<FormAtividadesWiewModel>{
        console.clear();
        console.log(atividade);
        return this.http.put<any>(this.API_URL + "/"+id, atividade)
        .pipe(map((res) => res.dados),
              tap((res) =>{console.log(res)}),
        catchError((err: HttpErrorResponse) =>this.processarErroHttp(err)))
        }

      public excluir(id:string){
          return this.http.delete<any>(this.API_URL + '/'+id)
          .pipe(map(res => res),
           catchError((err: HttpErrorResponse) =>this.processarErroHttp(err)))
         
      }

      public selecionarPorId(id: string){
          return this.http.get<any>(this.API_URL + "/visualizacao-completa/"+id )
          .pipe(
            map((res) => res.dados),
            tap((res) => {console.clear();console.log(res)}),
          catchError((err: HttpErrorResponse) =>this.processarErroHttp(err)))
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