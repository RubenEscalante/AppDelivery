import { Component, OnInit } from '@angular/core';

import {ClienteService} from '../../../common/services/cliente.service';
import {Cliente} from '../../../common/models/cliente'

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  constructor(private clienteService:ClienteService) { }

  listaClientes: Cliente[];
  ngOnInit()  {

    return this.clienteService.obtenerClientes().snapshotChanges().subscribe(item=>{
      this.listaClientes = [];
      item.forEach(element =>{
        let x =element.payload.toJSON();
        x["id"]=element.key;
        this.listaClientes.unshift(x as Cliente);
      });
    }); 


  }

}
