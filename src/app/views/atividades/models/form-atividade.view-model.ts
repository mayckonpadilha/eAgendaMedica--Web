import { Time } from "@angular/common";

export type FormAtividadesWiewModel = {
    assunto:string;
    dataRealizacao:Date;
    horaInicio:Time;
    horaTermino:Time;
    tipoAtividadeEnum:number;
    idsMedicos:string[];
};