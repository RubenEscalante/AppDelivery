import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/menu/models/products';
import {MenucartService} from '../../../../../services/menucart.service';
import {FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';
import {Cartitems} from 'src/app/menu/models/cartitems';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css', '../../../menu.component.css'],
})
export class ProductoModalComponent implements OnInit {
  @Input() productos: any ;
  Object = Object;
  public modalsNumber = 0;
  public timeLeft: number = 60;
  interval;
  valor: number = 1;
  productoModalForm = this.fb.group({
    quantity: [1, [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1)]],
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
    private fb: FormBuilder,
    private toastr: ToastrService
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
    if (!this.productoModalForm.valid) {
      this.productoModalForm.setValue({
        quantity: 1
      });
    } else {
      const formValue = this.productoModalForm;
      const mycart: Cartitems = {
        id: this.productos.id,
        nombre: this.productos.nombre,
        categoria: this.productos.categoria,
        descripcion: this.productos.descripcion,
        preferencias: this.productos.preferencias,
        costo: this.productos.costo,
        cantidad: formValue.value.quantity,
        imagen: this.productos.imagen === undefined ? 'https://www.lonestarpark.com/wp-content/uploads/2019/04/image-placeholder-500x500.jpg' : this.productos.imagen.url
      };
      this.menuCartservice.addToCar(mycart);
      this.productoModalForm.setValue({
        quantity: 1
      });
      this.toastr.success('Producto agregado al carrito', 'Exito',{
        progressBar: true,
        timeOut: 1500,
        closeButton: true
      });
    }
   // console.log(mycart);

  }

  restarcantidad() {
    this.valor = this.productoModalForm.value.quantity;
    if (this.valor > 1) {
      this.valor--;
    }
    if (!this.productoModalForm.valid) {
      this.productoModalForm.setValue({
        quantity: 1
      });
    } else {
      this.productoModalForm.setValue({
        quantity: this.valor
      });
    }
  }

  aumentarcantidad() {
    this.valor = this.productoModalForm.value.quantity;
    if (this.valor >= 1) {
      this.valor++;
    }
    if (!this.productoModalForm.valid) {
      this.productoModalForm.setValue({
        quantity: 1
      });
    } else {
      this.valor > 30 ? this.valor = 30 :
      this.productoModalForm.setValue({
        quantity: this.valor
      });
    }
  }

  cerrar() {
    this.activeModal.close();
  }
}
