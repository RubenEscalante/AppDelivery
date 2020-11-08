import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProductoModalComponent} from './producto-modal/producto-modal.component';
import {Products} from 'src/app/menu/models/products';
import {Cartitems} from 'src/app/menu/models/cartitems';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {MenucartService} from 'src/app/menu/services/menucart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css', '../../menu.component.css'],
})
export class ProductoItemComponent implements OnInit {
  @Input() productos: any;
  valor: number = 1;
  productoForm = this.fb.group({
    quantity: [1, [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1)]]
  });


  constructor(private modalService: NgbModal, ngbConfig: NgbConfig, private fb: FormBuilder, public menuCartservice: MenucartService, private toastr: ToastrService) {
    ngbConfig.animation = true;
  }

  ngOnInit(): void {
  }

  openModal() {
    if (this.conditionalProduct()) {
      const modalRef = this.modalService.open(ProductoModalComponent, {
        centered: true, windowClass: 'custom-class'
      });
      modalRef.componentInstance.productos = this.productos;
    }
  }

  conditionalProduct() {
    return ['pupusas', 'Especialidad'].includes(this.productos.categoria);
  }

  onSubmit() {
    if (!this.productoForm.valid) {
      this.productoForm.setValue({
        quantity: 1
      });
    } else {
      const myvalue = this.productoForm;
      const mycart: Cartitems = {
        id: this.productos.id,
        nombre: this.productos.nombre,
        categoria: this.productos.categoria,
        descripcion: this.productos.descripcion,
        preferencias: this.productos.preferencias,
        costo: this.productos.costo,
        cantidad: myvalue.value.quantity,
        imgurl: this.productos.imgurl
      };
      this.menuCartservice.addToCar(mycart);
      this.productoForm.setValue({
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
    this.valor = this.productoForm.value.quantity;
    if (this.valor > 1) {
      this.valor--;
    }
    if (!this.productoForm.valid) {
      this.productoForm.setValue({
        quantity: 1
      });
    } else {
      this.productoForm.setValue({
        quantity: this.valor
      });
    }
  }

  aumentarcantidad() {
    this.valor = this.productoForm.value.quantity;
    if (this.valor >= 1) {
      this.valor++;
    }
    if (!this.productoForm.valid) {
      this.productoForm.setValue({
        quantity: 1
      });
    } else {
      this.valor > 30 ? this.valor = 30 :
      this.productoForm.setValue({
        quantity: this.valor
      });
    }
  }
}
