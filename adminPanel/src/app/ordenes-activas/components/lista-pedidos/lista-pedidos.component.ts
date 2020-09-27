import { Component, OnInit } from '@angular/core';
//Servicio
import {OrdenService} from '../../services/orden.service';
//Modelo
import {Orden} from '../../models/orden';


@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css'],
  providers:[OrdenService]
})
export class ListaPedidosComponent implements OnInit {
   
  
  listaPedidos: Orden[];
  //La orden que se esta editando
  ordenActiva: Orden;
   
  constructor(private servicioOrdenes: OrdenService) { }

  ngOnInit() {
    this.obtenerOrdenes();
  }

  obtenerOrdenes():void{
    this.servicioOrdenes.obtenerOrdenes().subscribe(respuesta =>(this.listaPedidos=respuesta));
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
  } 

}
