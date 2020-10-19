import { Component, OnInit } from '@angular/core';


//Componentes para mostrar modal
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ProductomodalComponent } from '../productomodal/productomodal.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  abrirModalParaProductos(){ 
    const modalRef =this.modalService.open(ProductomodalComponent, {size:<any>'lg'});
     
  }

}
