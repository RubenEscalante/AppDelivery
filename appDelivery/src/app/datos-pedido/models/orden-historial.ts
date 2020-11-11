import { Producto } from './producto';

export class OrdenHistorial {
    constructor(
        public id:string,
        public estado:string,
        public fechaCreacion:string,
        public direccionEnvio:string,
        public productos:(Producto)[]|null,
        public total:number
    ){}
}
