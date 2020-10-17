import { Direccion } from './direccion';
import { Producto } from './producto';
import { Usuario } from './usuario';

export class Orden {
    constructor(
        public descuento:number,
        public direccionEnvio:string,
        public estado:string,
        public fechaCreacion:string,
        public id:string,
        public productos:Producto[],
        public total:number,
        public subtotal:number,
        public usuario:Usuario,
        public telefono
    ){}
}
