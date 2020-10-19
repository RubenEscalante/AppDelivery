import{Preferencias} from './preferencias';

export class Producto {
    nombre: string; 
    descripcion:string;    
    cantidad: number;
    precio: number;
    categoria:string;    
    preferencias?: (Preferencias)|null; 
}
