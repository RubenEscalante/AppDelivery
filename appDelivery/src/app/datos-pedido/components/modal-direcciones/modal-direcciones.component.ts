import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ValidationErrors} from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Direccion } from '../../models/direccion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-direcciones',
  templateUrl: './modal-direcciones.component.html',
  styleUrls: ['./modal-direcciones.component.css']
})
export class ModalDireccionesComponent implements OnInit {

  direccion:Direccion;

  @Output() agregarDireccion = new EventEmitter();
  
  formularioDireccion = new FormGroup({
    nombre: new FormControl('',[Validators.required, this.validarCadena]),
    direccion: new FormControl('',[Validators.required, this.validarCadena]),
    municipio: new FormControl('',[Validators.required]),
    departamento: new FormControl('',[Validators.required])
  });

  constructor(
    public modal:NgbModal,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  //Validación para verificar que los campos contengan cadenas
  validarCadena(control:FormControl):ValidationErrors{
    if(Number(control.value)){
      return {validarCadena:true};
    }else{
      return null;
    }
  }

  guardarDireccion(datosDireccion){
    this.direccion = datosDireccion;
    this.agregarDireccion.emit(this.direccion);
    this.toastr.success('Direccion registrada exitosamente', 'Direccion Registrada',{
      progressBar:true,
      timeOut:1500,
      closeButton:true
    })
  }

}
