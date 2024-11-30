import { Rol } from "./menu";

export interface Usuario
{
    id?: number;
    nombre?: string;

    rol?: Rol;
}