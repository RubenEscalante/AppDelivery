import { Component, OnInit } from '@angular/core';

//Componentes para mostrar modal
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalpupusasComponent } from '../modalpupusas/modalpupusas.component';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  abrirModalParaPupusas(){ 
    const modalRef =this.modalService.open(ModalpupusasComponent, {size:<any>'lg'});
     
  }

}
