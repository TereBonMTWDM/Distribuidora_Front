export interface Renovacion
{
    idCobranza?: number;
    asegurado?: string;
    telefono?: string;
    correo?: string;
    numPoliza?: string;
    fechaVencimiento?: Date; //string;
    // fechaInicioPeriodo?: Date;
    primaTotal?: number;
    primaNeta?: number;
    esRenovado?: boolean;
    fechaRenovacion?: Date;
}