import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms'

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  activarDireccion:Boolean;
  @Output() enviarDireccion = new EventEmitter();

  formularioDireccion = new FormGroup({
    nombre: new FormControl('',[Validators.required, this.validarCadena]),
    direccion: new FormControl('',[Validators.required, this.validarCadena]),
    departamento: new FormControl('',[Validators.required]),
    municipio: new FormControl('',[Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  activarDesactivar(bool){
    this.activarDireccion = bool;
  }

  agregarDireccion(datosDireccion){

  }

  validarCadena(control:FormControl):ValidationErrors{
    if(Number(control.value)){
      return {validarCadena:true};
    }else{
      return null;
    }
  }
}
