import{Preferencias} from './preferencias';

export class Producto {
    nombre: string; 
    descripcion:string;    
    cantidad: number;
    precio: number;
    categoria:string;    
    imagen:string;
    preferencias?: (Preferencias)|null; 
}
