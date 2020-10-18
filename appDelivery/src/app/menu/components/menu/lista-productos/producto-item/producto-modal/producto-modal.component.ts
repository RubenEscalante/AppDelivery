import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/menu/models/products';
import {MenucartService} from '../../../../../services/menucart.service';
import {FormBuilder} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';
import {Cartitems} from 'src/app/menu/models/cartitems';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css', '../../../menu.component.css'],
})
export class ProductoModalComponent implements OnInit {
  @Input() productos: Products ;
  Object = Object;
  public modalsNumber = 0;
  public timeLeft: number = 60;
  interval;
  productoModalForm = this.fb.group({
    quantity: [1],
    dough: ['maiz']
  });

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 0.3);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public menuCartservice: MenucartService,
    private fb: FormBuilder
  ) {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }
  ngOnInit(): void {
    this.startTimer();
   // console.log(this.productos);
  }

  onSubmit() {
    const formValue = this.productoModalForm;
    const mycart: Cartitems = {
      id: this.productos.id,
      nombre: this.productos.nombre,
      categoria: this.productos.categoria,
      descripcion: this.productos.descripcion,
      preferencias: this.productos.preferencias,
      costo: this.productos.costo,
      cantidad: formValue.value.quantity,
      imgurl: this.productos.imgurl
    };
    this.menuCartservice.addToCar(mycart);
   // console.log(mycart);

  }
}
