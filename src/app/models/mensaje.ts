export interface Mensaje
{
    idCobranza?: number;
    descripcion?: string;
    usuario?: string;
    idTipoMensaje?: number;
    tipoMensaje?: string;
    fechaCalendario?: Date;
}