import { Direccion } from './direccion';
import { OrdenHistorial } from './orden-historial';

export class Usuario {
    constructor(
        public uid:string,
        public nombre:string,
        public correo:string,
        public telefono:string,
        public direcciones:Direccion[],
        public historial:OrdenHistorial[]
    ){}
}
