import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductoModalComponent } from './producto-modal/producto-modal.component';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css'],
})
export class ProductoItemComponent implements OnInit {
  @Input() productos: any;

  constructor(private modalService: NgbModal, ngbConfig: NgbConfig) {
    ngbConfig.animation = true;
  }

  ngOnInit(): void {}
  open() {
    const modalRef = this.modalService.open(ProductoModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.productos = this.productos;
  }
}
