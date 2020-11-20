import{Producto} from './producto';
import{Usuario} from './usuario';

export interface Orden {
    id: string;
    estado: string;
    productos?: (Producto)[]|null;
    usuario: Usuario;
    direccionEnvio: string;
    telefono?:string;
    total:number;
    subtotal:number;
    descuento:number;
    fechaCreacion: Date;
    fechaEntrega?: Date;
    userId:string;
}
