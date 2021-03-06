import { Component, OnInit, Input } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';  


//Servicio de validacion de minimo y maximo
import { ValidadorminmaxService } from '../../common/services/validadorminmax.service';

//Servicio productos
import { ProductoService } from '../../common/services/producto.service';
import {IngredientesService} from '../../common/services/ingredientes.service';

//Modelos
import { Ingrediente } from '../../common/models/ingrediente';
import { Producto} from '../../common/models/producto';
import { Preferencias} from '../../common/models/preferencias';

@Component({
  selector: 'app-modalpupusas',
  templateUrl: './modalpupusas.component.html',
  styleUrls: ['./modalpupusas.component.css']
})
export class ModalpupusasComponent implements OnInit {

  @Input() pupusaParaModificar;
  @Input() idParaModificar;

  IngredienteInputDataList='';

  //Ingredientes recuperados de la base de datos
  listaIngredientes;   

  //Este item contiene la lista de ingredientes que se enviaran con la pupusa a la BD
  receta=[];

  //El ingrediente que selecciona el usuario
  ingredienteSeleccionado:Ingrediente;   

  //Imagen de producto
  imagenProductoUrl = null;  
  imagenProducto;
  
  //La imagen que se muestra cuando el producto no tiene una imagen
  imagenPorDefecto="http://via.placeholder.com/200x300";


  //Variable para guardar nuevo producto
  private nuevaPupusa: Producto = new Producto();

  //FormGroup para controlar las pupusas
  pupusaForm: FormGroup;
 
  constructor(public activeModal: NgbActiveModal,
              private productosService: ProductoService,
              private ingredientesService:IngredientesService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerIngredientes();
    //Creando formGroup 
    this.pupusaForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(100)]), 
      masa: new FormControl('',Validators.required),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]),
      costo: new FormControl('', [Validators.required,ValidadorminmaxService.max(100),ValidadorminmaxService.min(0.01)])
    
    });  

    if(this.pupusaParaModificar)
      this.recuperarDatosProducto();


  }

  //Si se va a editar un producto esta funcion recupera los datos
  recuperarDatosProducto(){    
    this.pupusaForm.get("nombre").setValue(this.pupusaParaModificar.nombre); 
    this.pupusaForm.get("masa").setValue(this.pupusaParaModificar.preferencias.masa); 
    this.pupusaForm.get("descripcion").setValue(this.pupusaParaModificar.descripcion); 
    this.pupusaForm.get("costo").setValue(this.pupusaParaModificar.costo);     

    if(this.pupusaParaModificar.imagen)
      this.imagenProductoUrl = this.pupusaParaModificar.imagen.url;
    
    
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
 }


  obtenerIngredientes():void{
    this.ingredientesService.obtenerIngredientes().snapshotChanges().subscribe(item=>{
      this.listaIngredientes=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();
        x["id"]=element.key;
        this.listaIngredientes.push(x as Ingrediente);   
      }); 

      if(this.pupusaParaModificar){
        console.log(this.pupusaParaModificar);
        this.generateArray(this.pupusaParaModificar.preferencias.ingredientes).forEach(element=>{
          this.listaIngredientes = this.listaIngredientes.filter(item => item.id != element.id); 
           this.receta.push(element);
        });   
      } 
    },
    // The 2nd callback handles errors.
    (err)=>console.error(err),
    // The 3rd callback handles the "complete" event. 
    () => console.log("Complete") 
    );   
  }

  agregarEnLista(){  
    if(this.ingredienteSeleccionado==undefined)
      return
    console.log(this.ingredienteSeleccionado);
    this.receta.push(this.ingredienteSeleccionado);
    this.ingredienteSeleccionado=undefined; 
    this.IngredienteInputDataList='';
  } 

  recuperarIngrediente(e){
    this.ingredienteSeleccionado=this.listaIngredientes.find((c)=> c  .nombre==e.target.value);  
    this.listaIngredientes = this.listaIngredientes.filter(item => item !== this.ingredienteSeleccionado); 
  }

  quitarIngrediente(ingrediente){
    this.listaIngredientes.push(ingrediente);
    this.receta = this.receta.filter(item => item !== ingrediente); 
  } 


    /*TODO: Validación de imagen? */

    eliminarImagen(){
      this.imagenProductoUrl = null;  
      this.imagenProducto = null;
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

  crearSinoEditarPupusa(){
    if (this.pupusaForm.invalid || !this.receta?.length) {
      return;
    }  

    let preferencias:Preferencias = new Preferencias;
    preferencias.masa=this.pupusaForm.get("masa").value;
    preferencias.ingredientes = this.receta; 

    delete this.pupusaForm.value.masa; 

    this.nuevaPupusa = Object.assign(this.nuevaPupusa,this.pupusaForm.value);
    this.nuevaPupusa.preferencias = preferencias; 
    this.nuevaPupusa.categoria="pupusas";


    /*Si no existe una referencia a una pupusa, entonces se crea una nueva,
      de lo contrario se edita el producto*/
      
    if(!this.pupusaParaModificar){
      this.productosService.crearProductoImagen(this.nuevaPupusa, this.imagenProducto);      
      this.activeModal.dismiss();
      return;
    }

    //Actualizando producto
    this.productosService.actualizarProducto(this.nuevaPupusa,this.idParaModificar);   


    /*Si el producto no tenia una imagen entonces se sube una imagen, si ya existia una imagen
      y se detectan cambios entonces se actualiza la imagen existente, de forma que se pueda liberar espacio y
      no hallan imagenes sin utilizar*/


    if(!this.pupusaParaModificar.imagen){
      this.productosService.subirImagen(this.pupusaParaModificar, this.imagenProducto);
      this.activeModal.dismiss();
      return;
    }

    if(this.imagenProductoUrl != this.pupusaParaModificar.imagen.url) {
      this.productosService.actualizarImagen(this.pupusaParaModificar, this.imagenProducto); 
      this.activeModal.dismiss();
      return;
    }   
     
     
    this.activeModal.dismiss();


  }
 


}
