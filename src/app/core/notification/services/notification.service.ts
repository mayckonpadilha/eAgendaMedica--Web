import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable()

export class NotificationService{

    constructor(private snackBar: MatSnackBar){}

    sucesso(mensagem: string){
        this.snackBar.open(mensagem,'OK',{panelClass:['snackbar-sucesso']});
    }

    aviso(mensagem: string){
        this.snackBar.open(mensagem,'OK',{panelClass:['snackbar-aviso']});
    }

    erro(mensagem: string){
        this.snackBar.open(mensagem,'OK',{panelClass:['snackbar-erro']});
    }
}