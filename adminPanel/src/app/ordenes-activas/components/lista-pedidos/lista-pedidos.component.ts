import { Component, OnInit } from '@angular/core';
//Servicio
import {OrdenService} from '../../../common/services/orden.service';
//Modelo
import {Orden} from '../../../common/models/orden';

import {Global} from '../../../common/global';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css'],
  providers:[OrdenService]
})
export class ListaPedidosComponent implements OnInit {
  
  global: Global;
  
  listaPedidos: Orden[];
  //La orden que se esta editando
  ordenActiva: Orden;
   
  constructor(private servicioOrdenes: OrdenService,
              global:Global) { 
                this.global=global;
              }

  ngOnInit() {
    this.obtenerOrdenes();
 
   
  }

  obtenerOrdenes():void{
    // The 1st callback handles the data emitted by the observable. 
    this.servicioOrdenes.obtenerOrdenes().subscribe(respuesta =>{
      this.listaPedidos=respuesta
    },
    // The 2nd callback handles errors.
    (err)=>console.error(err),
    // The 3rd callback handles the "complete" event.
    () => this.global.numeroOrdenes=this.listaPedidos.length
    );
    
  }

  //Funciones para cambiar estado de producto, posiblemente inseguras, por aqui entra un buen jiaker xd
  moverCocina(orden:Orden){
    orden.estado = "Cocinado";
    this.ordenActiva=orden;
  }

  moverListo(orden:Orden){
    orden.estado="Listo";
    this.ordenActiva=orden;
  }

  moverEnviado(orden:Orden){
    orden.estado="Enviado";
    this.ordenActiva=orden;
  }

  moverEntregado(orden:Orden){
    orden.estado="Entregado";
    this.ordenActiva=orden;
  }
 
  actualizar(){
    if(this.ordenActiva){        
        this.servicioOrdenes
        .actualizarEstado(this.ordenActiva)
        .subscribe();
        this.ordenActiva=undefined;
    } 
    this.obtenerOrdenes();
  } 
 

}
