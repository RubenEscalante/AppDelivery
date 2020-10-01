import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  datos = [
    {"codigoProducto":1,"precioProducto":0.50,"cantidad":1,"descripcion":'Pupusa frijol con queso',"fotografia":'aa'},
    {"codigoProducto":2,"precioProducto":1.50,"cantidad":2,"descripcion":'Soda Coca-cola 2.5L',"fotografia":'aa'},
    {"codigoProducto":3,"precioProducto":3.25,"cantidad":3,"descripcion":'Pie de Manzana',"fotografia":'aa'},
    {"codigoProducto":4,"precioProducto":0.5,"cantidad":4,"descripcion":'Pupusa de frijol con queso',"fotografia":'aa'},
  ];

  constructor() {
    //TODO: Eliminar esta línea de código cuando reciba los datos de rubén
    //this.set('productos',this.datos);
  }

  set(key:string, data:any){
    localStorage.setItem(key,JSON.stringify(data));
  }

  get(key:string){
    //console.log(JSON.parse(localStorage.getItem(key)));
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key:string){
    localStorage.removeItem(key);
  }

  clear(key:string){
    localStorage.clear();
  }
}
