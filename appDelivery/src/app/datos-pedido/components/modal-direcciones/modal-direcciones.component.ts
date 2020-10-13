import { Component, OnInit } from '@angular/core';
import { NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal-direcciones',
  templateUrl: './modal-direcciones.component.html',
  styleUrls: ['./modal-direcciones.component.css']
})
export class ModalDireccionesComponent implements OnInit {

  constructor(
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
  }

}
