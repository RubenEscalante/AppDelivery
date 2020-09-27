import { Injectable } from '@angular/core';  
import { HttpClient, HttpParams } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http'; 
//Modelo
import {Orden} from '../models/orden';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    //Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})

export class OrdenService{ 

  constructor( private Clientehttp: HttpClient) { }

  //Api key
  API_KEY = 'La llave de la api';
  //Api Url
  private ordenesUrl='http://localhost:3000/ordenes';

  
  //Obteniendo ordenes del Servidor
  obtenerOrdenes(){
    return this.Clientehttp.get<Orden[]>(this.ordenesUrl);
    //return this.http.get(this.ordenesUrl); 
  }
  
  //Buscar Orden por estado
  filtrarOrdenesEstado(){

  }

  //Cuando sea necesario actualizar el estado de la orden seleccionada
  actualizarEstado(orden:Orden){  
     return this.Clientehttp.put(`${this.ordenesUrl}/${orden.id}`,orden,httpOptions);  
  }



}
