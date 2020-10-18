import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  activarDireccion:Boolean;

  constructor() { }

  ngOnInit(): void {
  }

  activarDesactivar(bool){
    this.activarDireccion = bool;
  }
}
