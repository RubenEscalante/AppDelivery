import{Preferencias} from './preferencias';
import {Imagen} from './imagen';

export class Producto {
    nombre: string; 
    descripcion:string;    
    cantidad: number;
    costo: number;
    categoria:string;    
    imagen?: (Imagen)|null;
    preferencias?: (Preferencias)|null; 
}


