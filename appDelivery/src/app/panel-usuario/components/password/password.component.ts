import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  activarContra:Boolean;
  cambiarContra = new FormGroup({
    contra: new FormControl('',[Validators.required]),
    nuevaContra: new FormControl('',[Validators.required]),
    confirmarContra: new FormControl('',[Validators.required])
  });
  constructor() { }

  ngOnInit(): void {
    this.activarContra = false;
  }

  activarDesactivar(bool){
    this.activarContra = bool;
  }
}
