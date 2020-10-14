import { Component, OnInit } from '@angular/core'; 
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';   

//Servicio de validacion de minimo y maximo
import { ValidadorminmaxService } from '../../../common/services/validadorminmax.service';

//Service
import { IngredientesService } from '../../../common/services/ingredientes.service';


//Modelo
import { Ingrediente } from '../../../common/models/ingrediente';

@Component({
  selector: 'app-productomodal',
  templateUrl: './productomodal.component.html',
  styleUrls: ['./productomodal.component.css']
})
export class ProductomodalComponent implements OnInit {
 

  //Formulario
  ingredienteForm: FormGroup;
  //Variable para guardar nuevo ingrediente
  private nuevoIngrediente: Ingrediente = new Ingrediente();

  constructor(
    public ingredienteServicio:IngredientesService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    //Creando formGroup 
    this.ingredienteForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      costo: new FormControl('', [Validators.required,ValidadorminmaxService.max(100),ValidadorminmaxService.min(0.01)])
    }); 
  }

  crearProducto(){
    if (this.ingredienteForm.invalid) {
      return;
    }    
    this.nuevoIngrediente = Object.assign(this.nuevoIngrediente, this.ingredienteForm.value);
    this.ingredienteServicio.crearIngrediente(this.nuevoIngrediente);
    this.activeModal.dismiss();
    
  }
 
 
}
