import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';   

@Component({
  selector: 'app-productomodal',
  templateUrl: './productomodal.component.html',
  styleUrls: ['./productomodal.component.css']
})
export class ProductomodalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
