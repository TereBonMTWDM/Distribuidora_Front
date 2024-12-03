export interface ProdProveedor
{
    id?: number;
    idProducto?: number;
    claveProducto?: string;
    nombreProducto?: string;
    idTipoProducto?: number;
    tipoProducto?: string;
    precio?: number;

    idProveedor?: number;
    nombreProveedor?: string;
    claveProveedor?: string;
    costo?: number;
    notas?: string;
}