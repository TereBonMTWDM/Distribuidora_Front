import { Periodicidad, TipoPoliza} from '../models/catalogModels';
export interface Cobranza {
    id?: number;
    asegurado?: string;
    numPoliza?: number;
    inicioPoliza?: Date;
    terminoPoliza?: Date;
    plan?: string;
    agente?: string;
    primaTotal?: string;
    primaNeta?: string;
    psfp?: string;
    ultimoMsj?: string;
    periodicidad?: Periodicidad;
    estatusCobro?: string;
    compania?: string;
    estatusPlan?: string;
    tipoPoliza?: TipoPoliza;
    moneda?: string;
    conducto?: string;
    fechaProxPago?: Date; //string
    ramo?: string;
    //pagoProgramado?: PagoProgramado;
    
}