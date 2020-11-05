import { Component, OnInit, Input } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'; 

//Servicio de validacion de minimo y maximo
import { ValidadorminmaxService } from '../../common/services/validadorminmax.service';
//Servicio productos
import { ProductoService } from '../../common/services/producto.service';

//Modelos 
import { Producto} from '../../common/models/producto';  

@Component({
  selector: 'app-modalotrosproductos',
  templateUrl: './modalotrosproductos.component.html',
  styleUrls: ['./modalotrosproductos.component.css']
})

export class ModalotrosproductosComponent implements OnInit {

  @Input() productoParaModificar;
  @Input() idParaModificar;

  //Imagen de producto
  imagenProductoUrl = null;  
  imagenProducto;
  
  //La imagen que se muestra cuando el producto no tiene una imagen
  imagenPorDefecto="http://via.placeholder.com/200x300";
  
  //Variable para guardar nuevo producto
  private nuevoProducto: Producto = new Producto();


  
  productoForm: FormGroup;


  constructor(public activeModal: NgbActiveModal,
              private productosService: ProductoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.productoForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(100)]), 
      categoria: new FormControl('',Validators.required),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
      costo: new FormControl('', [Validators.required,ValidadorminmaxService.max(100),ValidadorminmaxService.min(0.01)]),     
    
    }); 
    
    if(this.productoParaModificar)
      this.recuperarDatosProducto();
  }

  //Crea un nuevo producto, si ya existe lo actualiza
  crearSinoEditarProducto(){
    if (this.productoForm.invalid) {
      return;
    }    

    this.nuevoProducto = Object.assign(this.nuevoProducto,this.productoForm.value);

    if(!this.productoParaModificar){
      this.productosService.crearProductoImagen(this.nuevoProducto, this.imagenProducto);      
      this.activeModal.dismiss();
      return;
    }

    //Actualizar producto 
    this.productosService.actualizarProducto(this.nuevoProducto,this.idParaModificar);    

    if(!this.productoParaModificar.imagen){
      this.productosService.subirImagen(this.productoParaModificar, this.imagenProducto);
      this.activeModal.dismiss();
      return;
    }

   
    if(this.imagenProductoUrl != this.productoParaModificar.imagen.url) {
      this.productosService.actualizarImagen(this.productoParaModificar, this.imagenProducto); 
      this.activeModal.dismiss();
      return;
    }   
    
    this.activeModal.dismiss();
   

  }     
 

  
 /*TODO: Limpiar el campo imagen si la imagen no es valida*/

  actualizarImagen(event){
    if (!event.target.files && !event.target.files[0]) {        
      return;
    } 
    //Verificando que el archivo sea una imagen 
    let tipo = event.target.files[0].type;
    if (tipo.match(/image\/*/) == null) { 
      console.log("Debe seleccionar una imagen valida"); 
			return;
    } 
    this.imagenProducto=event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);  

    reader.onload = (event) => {  
      this.imagenProductoUrl = event.target.result;  
    }   
  }

  /*TODO: Validación de imagen? */

  eliminarImagen(){
    this.imagenProductoUrl = null;  
    this.imagenProducto = null;
  }


  //Recupera los datos del producto a modificar
  recuperarDatosProducto(){     
    
    this.productoForm.get("nombre").setValue(this.productoParaModificar.nombre); 
    this.productoForm.get("categoria").setValue(this.productoParaModificar.categoria); 
    this.productoForm.get("descripcion").setValue(this.productoParaModificar.descripcion); 
    this.productoForm.get("costo").setValue(this.productoParaModificar.costo); 

    if(this.productoParaModificar.imagen) 
      this.imagenProductoUrl = this.productoParaModificar.imagen.url;

  }

}
