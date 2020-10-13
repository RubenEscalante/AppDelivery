import {Component, OnInit} from '@angular/core';
import {ProductlistService} from '../../../services/productlist.service';
import {ProductfilterService} from '../../../services/productfilter.service';
import {Products} from 'src/app/menu/models/products';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  Productos: Products;
  valorfiltro: any;
  page_size: number = 6;
  page_number: number = 1;

  constructor(
    private productListService: ProductlistService,
    private filterService: ProductfilterService
  ) {
  }

  ngOnInit(): void {
    if (!this.valorfiltro) {
      this.valorfiltro = 'Tradicional';
    }
    this.filterService.enviarMensajeObservable.subscribe((data) => {
      this.valorfiltro = data;
      this.page_number = 1;
    });
    this.productListService.getProductos().subscribe(
      (data) => {
        localStorage.setItem('datos', JSON.stringify(data));
        this.Productos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
