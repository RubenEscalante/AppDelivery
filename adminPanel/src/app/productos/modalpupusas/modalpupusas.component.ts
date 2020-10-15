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

  //Ingredientes recuperados de la base de datos
  listaIngredientes=[];   
  //Este item contiene la lista de ingredientes 
  //que va a llevar la pupusa
  receta=[];

  ingredienteSeleccionado:Ingrediente;
  


  constructor(public activeModal: NgbActiveModal,
              private productosService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerIngredientes();
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

  añadirIngrediente(e){ 
    console.log(e);
  }
  hola(ingrediente){
   console.log(ingrediente);
  }

  removerIngrediente(){
    alert("Hola mundo");
  }

}
