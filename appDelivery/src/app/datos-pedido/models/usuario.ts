import { Direccion } from './direccion';

export class Usuario {
    constructor(
        public uid:string,
        public nombre:string,
        public correo:string,
        public telefono:string,
        public direcciones:Direccion[]
    ){}
}
