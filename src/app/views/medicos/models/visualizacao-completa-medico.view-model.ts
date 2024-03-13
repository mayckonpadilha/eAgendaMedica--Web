import { HorasOcupadasViewModel } from "./horas-ocupadas.view-model";
import { ListarAtividadesWiewModel } from "../../atividades/models/listar-atividade.view-model";

export type VisualizarMedicosWiewModel = {
    id?:number;
    crm:string;
    nome:string;
    emAtividade:boolean;
    horasDeDescanso:string;
    horasOcupadas:HorasOcupadasViewModel[];
    atividades:ListarAtividadesWiewModel[];
};