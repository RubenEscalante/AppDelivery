import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProductoModalComponent} from './producto-modal/producto-modal.component';
import {Products} from 'src/app/menu/models/products';
import {Cartitems} from 'src/app/menu/models/cartitems';
import {FormControl, FormGroup} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {MenucartService} from 'src/app/menu/services/menucart.service';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css', '../../menu.component.css'],
})
export class ProductoItemComponent implements OnInit {
  @Input() productos: Products;
  productoForm = this.fb.group({
    quantity: [1]
  });

  constructor(private modalService: NgbModal, ngbConfig: NgbConfig, private fb: FormBuilder, public menuCartservice: MenucartService) {
    ngbConfig.animation = true;
  }

  ngOnInit(): void {
  }

  openModal() {
    if (this.conditionalProduct()) {
      const modalRef = this.modalService.open(ProductoModalComponent, {
        centered: true,
      });
      modalRef.componentInstance.productos = this.productos;
    }
  }

  conditionalProduct() {
    return ['pupusas', 'Especialidad'].includes(this.productos.categoria);
  }

  onSubmit() {
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
   // console.log(mycart);

  }
}
