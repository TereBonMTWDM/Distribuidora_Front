import { Usuario } from "./usuario";

export interface Menu
{
    id?: number;
    idPadre?: number;
    nivel?: number;
    link?: string;
    linkText?: string;
    icono?: string;
    orden?: number;
    activo?: boolean;
}


export interface Rol {
    id?: number;
    nombre?: string;
    activo?: boolean;

    // usuarios?: Usuario[];
    // menusXPerfil?: MenusByRol[];
}


export interface MenusByRol
{
    idMenu: Number;
    menu: Menu;

    idRol: Number;
    rol: Rol;
}