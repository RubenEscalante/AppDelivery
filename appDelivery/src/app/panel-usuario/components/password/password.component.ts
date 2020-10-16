import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  activarContra:Boolean;
  constructor() { }

  ngOnInit(): void {
    this.activarContra = false;
  }

  activarDesactivar(bool){
    this.activarContra = bool;
  }
}
