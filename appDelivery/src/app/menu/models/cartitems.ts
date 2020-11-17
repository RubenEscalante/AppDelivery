export interface Cartitems {
    id: string;
    nombre: string;
    categoria: string;
    descripcion: string;
    preferencias?: string[];
    costo: number;
    cantidad: number;
    imagen: string;
}
