import { Component, OnInit, Input } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'; 

//Servicio de validacion de minimo y maximo
import { ValidadorminmaxService } from '../../common/services/validadorminmax.service';
//Servicio productos
import { ProductoService } from '../../common/services/producto.service';

//Modelos 
import { Producto} from '../../common/models/producto'; 
import { element } from 'protractor';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-modalotrosproductos',
  templateUrl: './modalotrosproductos.component.html',
  styleUrls: ['./modalotrosproductos.component.css']
})

export class ModalotrosproductosComponent implements OnInit {

  @Input() productoParaModificar;
  @Input() idParaModificar;

  //Variable para guardar nuevo producto
  private nuevoProducto: Producto = new Producto();

  //FormGroup para controlar las pupusas
  productoForm: FormGroup;


  constructor(public activeModal: NgbActiveModal,
              private productosService: ProductoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    //Creando formGroup 
    this.productoForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(100)]), 
      categoria: new FormControl('',Validators.required),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
      costo: new FormControl('', [Validators.required,ValidadorminmaxService.max(100),ValidadorminmaxService.min(0.01)])
    
    }); 
    
    if(this.productoParaModificar)
      this.recuperarDatosProducto();
  }

  crearSinoEditarProducto(){
    if (this.productoForm.invalid) {
      return;
    }    
    this.nuevoProducto = Object.assign(this.nuevoProducto,this.productoForm.value);

    if(this.productoParaModificar)
      this.productosService.actualizarProducto(this.nuevoProducto,this.idParaModificar);/*.then(result=>{
        console.log("Se ha actualizado la informaciond el producto");
      });*/
    else
      this.productosService.crearProducto(this.nuevoProducto);

    this.activeModal.dismiss();

  }
 

  recuperarDatosProducto(){     
    this.productoForm.get("nombre").setValue(this.productoParaModificar.nombre); 
    this.productoForm.get("categoria").setValue(this.productoParaModificar.categoria); 
    this.productoForm.get("descripcion").setValue(this.productoParaModificar.descripcion); 
    this.productoForm.get("costo").setValue(this.productoParaModificar.costo); 
  }

}
