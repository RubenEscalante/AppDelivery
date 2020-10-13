import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/menu/models/products';
import {MenucartService} from '../../../../../services/menucart.service';
import {FormBuilder} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css','../../../menu.component.css'],
})
export class ProductoModalComponent implements OnInit {
  @Input() productos: Products ;
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
  }

  onSubmit() {
    const myvalue = this.productoModalForm;
    let mycart: any = {
      $key: this.productos.$key,
      name: this.productos.name,
      type: this.productos.type,
      description: this.productos.description,
      ingredients: this.productos.ingredients,
      price: this.productos.price,
      quantity: myvalue.value.quantity,
      dough: myvalue.value.dough,
      imgurl: this.productos.imgurl
    };
    this.menuCartservice.addToCar(mycart);
   // console.log(mycart);

  }
}
