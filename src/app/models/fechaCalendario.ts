export interface FechaCalendario
{
    idCobranza?: number;
    fechaVencimiento?: Date;
    asegurado?: string;
    idRamo?: number;
}

export interface NotaCalendario
{
    idCobranza?: number;
    fechaCalendario?: Date;
    descripcion?: string;
    // idRamo?: number;
}