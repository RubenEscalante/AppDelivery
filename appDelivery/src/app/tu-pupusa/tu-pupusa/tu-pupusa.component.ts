import {Component, OnInit} from '@angular/core';
import {Products} from '../../menu/models/products';
import {ProductlistService} from '../../menu/services/productlist.service';
import {ReactiveFormsModule, FormsModule, NgControl} from '@angular/forms';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import {Cartitems} from '../../menu/models/cartitems';
import {MenucartService} from '../../menu/services/menucart.service';
import {ToastrService} from 'ngx-toastr';
import {ProductfilterService} from '../../menu/services/productfilter.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tu-pupusa',
  templateUrl: './tu-pupusa.component.html',
  styleUrls: ['./tu-pupusa.component.css', '../../menu/components/menu/menu.component.css', '../../menu/components/menu/lista-productos/lista-productos.component.css']
})


export class TuPupusaComponent implements OnInit {
  Ingredientes: any;
  public itemsArmaTuPupusa: any = [];
  public costoTotal: any;
  public costoUnidad: any ;
  valor: number = 1;
  numChecked: number = 0;
  public pupusaKey: any;
  form: FormGroup;
  productoForm = this.fb.group({
    quantity: [1, [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1)]],
    masa: ['Arroz']
  });

  constructor(private productListService: ProductlistService, private fb: FormBuilder, public menuCartservice: MenucartService, private toastr: ToastrService,private filterService: ProductfilterService,
              private router: Router) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });

  }

  ngOnInit(): void {
    this.pupusaKey = this.makeid(5);
  this.costoTotal = 0.25;
  this.costoUnidad = 0.25;
    // @ts-ignore
    return this.productListService.getIngredientes()
      .snapshotChanges().subscribe(item => {
        this.Ingredientes = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['id'] = element.key;
          this.Ingredientes.push(x as Products);
          //localStorage.setItem('datos', JSON.stringify(this.Productos));
        });
      });

  }


  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (this.numChecked == 4) {
      e.target.checked = false;
    }
    if (e.target.checked) {
      if (this.numChecked < 4) {
        checkArray.push(new FormControl(e.target.value));
        this.getItem(checkArray);
        this.numChecked++;
      }
    } else {
      let i: number = 0;
      if (this.numChecked >= 0) {
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            this.getItem(checkArray);
            this.numChecked--;
            return;
          }
          i++;
        });
      }
    }
  }

  getItem(Array) { //Formo el array con los ingredientes seleccionados al seleccionar o deseleccionar un checkbox

    this.itemsArmaTuPupusa = [];
    for (let i = 0; i < Array.value.length; i++) {
      this.Ingredientes.forEach((data) => {
        if (Array.value[i] == data.id) {
          this.itemsArmaTuPupusa.push(data);
        }
      });
    }
    this.getCosto();
  }

  getCosto() {
    this.costoTotal = 0.25;
    this.costoUnidad = 0.25;
    const myvalue = this.productoForm;
    this.itemsArmaTuPupusa.forEach((data) => {
      this.costoUnidad += data.costo;
    });
    this.costoTotal = this.costoUnidad * myvalue.value.quantity;
  }

  submitForm() { //TODO VALIDAR SOLO 4 INGREDIENTES Y QUE DEBE ESTAR SELECCIONADO POR LO MENOS UNO
    const myvalue = this.productoForm;
    if (this.numChecked < 2) {

    } else {
      const preferencias: any = {
        ingredientes: this.itemsArmaTuPupusa,
        masa: myvalue.value.masa
      };
      const mycart: Cartitems = {
        id: this.pupusaKey,
        nombre: 'Personalizada-' + this.pupusaKey,
        categoria: 'pupusas',
        descripcion: 'Arma tu pupusa con ' + this.itemsArmaTuPupusa.map((data) => {
          return data.nombre;
        }),
        preferencias,
        costo: this.costoUnidad,
        cantidad: myvalue.value.quantity,
        imagen: '../../../assets/img/pupusaPersonalizada.jpg'
      };
      this.menuCartservice.addToCar(mycart);
      this.toastr.success('Producto agregado al carrito', 'Exito', {
        progressBar: true,
        timeOut: 1500,
        closeButton: true
      });
      this.limpiarComponente();
    }
  }
  limpiarComponente() {
    this.ngOnInit();
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    this.itemsArmaTuPupusa = [];
    this.numChecked = 0;
    checkArray.controls = [];
    this.productoForm.setValue({
      quantity: 1,
      masa: 'Arroz'
    });

  }
  makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  restarcantidad() {

    this.valor = this.productoForm.value.quantity;
    if (this.valor > 1) {
      this.valor--;
    }
    if (!this.productoForm.valid) {
      this.productoForm.setValue({
        quantity: 1,
        masa: this.productoForm.value.masa
      });
    } else {
      this.productoForm.setValue({
        quantity: this.valor,
        masa: this.productoForm.value.masa
      });
      this.getCosto();
    }
  }

  aumentarcantidad() {
    this.valor = this.productoForm.value.quantity;
    if (this.valor >= 1) {
      this.valor++;
    }
    if (!this.productoForm.valid) {
      this.productoForm.setValue({
        quantity: 1,
        masa: this.productoForm.value.masa
      });
    } else {
      this.valor > 30 ? this.valor = 30 :
        this.productoForm.setValue({
          quantity: this.valor,
          masa: this.productoForm.value.masa
        });
      this.getCosto();
    }
  }
  cambiarfiltro(value: string) {
    this.filterService.enviarValorFiltro(value);
    this.router.navigate(['menu/categorias'], { queryParams: { filtro: value } });
    if (value === 'maiz') {
      this.router.navigate(['menu/categorias'], { queryParams: { filtro: 'pupusas', valorfiltroMasa: value } });
    }
    if (value === 'arroz') {
      this.router.navigate(['menu/categorias'], { queryParams: { filtro: 'pupusas', valorfiltroMasa: value } });
    }
  }
}
