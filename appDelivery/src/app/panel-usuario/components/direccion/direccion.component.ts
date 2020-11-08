import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Direccion } from 'src/app/datos-pedido/models/direccion';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  activarDireccion:Boolean;
  direccion:Direccion;
  formularioDireccion = new FormGroup({
    nombre: new FormControl('',[Validators.required, this.validarCadena]),
    direccion: new FormControl('',[Validators.required, this.validarCadena]),
    departamento: new FormControl('',[Validators.required]),
    municipio: new FormControl('',[Validators.required])
  });

  @Output() enviarDireccion = new EventEmitter();

  constructor(
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
  }

  activarDesactivar(bool){
    this.activarDireccion = bool;
  }

  agregarDireccion(datosDireccion){
    this.direccion = datosDireccion;
    this.enviarDireccion.emit(this.direccion);
    this.activarDireccion = false;
  }

  validarCadena(control:FormControl):ValidationErrors{
    if(Number(control.value)){
      return {validarCadena:true};
    }else{
      return null;
    }
  }

  guardarDireccion(d){

  }
}
