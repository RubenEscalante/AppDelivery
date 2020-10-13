import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public total:number;
  constructor() { }

  ngOnInit(): void {
    this.total = 0;
  }

  recibirTotal(valor){
    this.total = valor;
  }


}
