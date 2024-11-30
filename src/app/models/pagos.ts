export interface Pago
{
    fechaVencimiento?: Date;
    fechaPago?: Date;
    estatus?: boolean;
    usuario?: string; //confirmado/aplicado por

    primaNeta?: string;
    primaTotal?: string;
}