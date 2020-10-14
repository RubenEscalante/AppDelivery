import { Component, OnInit } from '@angular/core';


import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';  


//Servicio de validacion de minimo y maximo
import { ValidadorminmaxService } from '../../common/services/validadorminmax.service';

//Modelos
import { Ingrediente } from '../../common/models/ingrediente';

@Component({
  selector: 'app-modalpupusas',
  templateUrl: './modalpupusas.component.html',
  styleUrls: ['./modalpupusas.component.css']
})
export class ModalpupusasComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  removerIngrediente(){
    alert("Hola mundo");
  }

}
