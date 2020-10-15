import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';  


//Servicio de validacion de minimo y maximo
import { ValidadorminmaxService } from '../../common/services/validadorminmax.service';

//Servicio productos
import { ProductoService } from '../../common/services/producto.service';

//Modelos
import { Ingrediente } from '../../common/models/ingrediente';
import { element } from 'protractor';

@Component({
  selector: 'app-modalpupusas',
  templateUrl: './modalpupusas.component.html',
  styleUrls: ['./modalpupusas.component.css']
})
export class ModalpupusasComponent implements OnInit {

  IngredienteInputDataList='';

  //Ingredientes recuperados de la base de datos
  listaIngredientes=[];   

  //Este item contiene la lista de ingredientes que se enviaran con la pupusa a la BD
  receta=[];

  ingredienteSeleccionado:Ingrediente;   

  
  pupusaForm: FormGroup;
 
  constructor(public activeModal: NgbActiveModal,
              private productosService: ProductoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerIngredientes();
    //Creando formGroup 
    this.pupusaForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      costo: new FormControl('', [Validators.required,ValidadorminmaxService.max(100),ValidadorminmaxService.min(0.01)])
    
    }); 
  }

  obtenerIngredientes(){
    return this.productosService.obtenerIngredientes().snapshotChanges().subscribe(item=>{
      item.forEach(element=>{
        let x = element.payload.toJSON();
        x["id"]=element.key;
        this.listaIngredientes.push(x as Ingrediente);   
      });
    });

  }

  agregarEnLista(){  
    if(this.ingredienteSeleccionado==undefined)
      return
    this.receta.push(this.ingredienteSeleccionado);
    this.ingredienteSeleccionado=undefined; 
    this.IngredienteInputDataList='';
  } 

  recuperarIngrediente(e){
    this.ingredienteSeleccionado=this.listaIngredientes.find((c)=> c  .nombre==e.target.value);  
    this.listaIngredientes = this.listaIngredientes.filter(item => item !== this.ingredienteSeleccionado); 
  }

  quitarIngrediente(ingrediente){
    this.listaIngredientes.push(ingrediente);
    this.receta = this.receta.filter(item => item !== ingrediente); 
  }

  crearPupusa(){
    if (this.pupusaForm.invalid) {
      return;
    }  

    this.activeModal.dismiss();
  }


}
