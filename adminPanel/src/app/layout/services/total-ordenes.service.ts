import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' 
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TotalOrdenesService {

  constructor(private Clientehttp: HttpClient) { }

    //Api Url
    private ordenesUrl='http://localhost:3000/ordenes';

  obtenerNumeroOrdenes(){
     
    //return this.Clientehttp.get<Orden[]>(this.ordenesUrl);
    //return this.http.get(this.ordenesUrl); 
  }

}
