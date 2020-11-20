import {Component, HostListener, OnInit} from '@angular/core';
import {ProductlistService} from '../../../services/productlist.service';
import {ProductfilterService} from '../../../services/productfilter.service';
import {Products} from 'src/app/menu/models/products';


import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css', '../menu.component.css'],
})
export class ListaProductosComponent implements OnInit {
  Productos: Products[];
  valorfiltro: any;
  valorfiltroMasa: any = 'ambas';
  page_size: number = 8;
  page_number: number = 1;
  public innerWidth: any;

  constructor(
    private productListService: ProductlistService,
    private filterService: ProductfilterService,
    private route: ActivatedRoute

  ) {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1076) {
      this.page_size = 6;
    } else {
      this.page_size = 8;
    }
  } /*Al redimensionar*/



  ngOnInit(): void {
    if (document.documentElement.clientWidth < 1059)
    {
      this.page_size = 6;
    }else{
      this.page_size = 8;
    }

    this.route
      .queryParams
      .subscribe(params => {
        this.valorfiltro = params['filtro'] || 'pupusas';
        this.valorfiltroMasa = params['valorfiltroMasa'] || 'ambas';
     });






    this.filterService.enviarMensajeObservable.subscribe((data) => {
      this.valorfiltro = data;
      this.page_number = 1;
    });
    /* this.productListService.getProductos().subscribe(
       (data) => {
         localStorage.setItem('datos', JSON.stringify(data));
         this.Productos = data;
       },
       (error) => {
         console.log(error);
       }
     );*/
    // @ts-ignore

    return this.productListService.getProductos()
      .snapshotChanges().subscribe(item => {
        this.Productos = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['id'] = element.key;
          this.Productos.push(x as Products);
          //localStorage.setItem('datos', JSON.stringify(this.Productos));

        });

      });

  }


  valorFiltroMasa(prop) {
    this.cambiarfiltro('pupusas');
    this.valorfiltroMasa = prop;
  }

  cambiarfiltro(value: string) {
    this.filterService.enviarValorFiltro(value);
    this.valorfiltro = value;
  }

  conditionalProduct() {
    this.Productos.forEach(data => {
      return ['pupusas', 'Especialidad'].includes(data.categoria);
    });
  }
}
