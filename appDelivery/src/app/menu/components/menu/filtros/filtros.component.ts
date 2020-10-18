import { Component, Input, OnInit } from '@angular/core';
import { ProductfilterService } from '../../../services/productfilter.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent implements OnInit {
  valorFiltro: string = "pupusas";
  constructor(private filterService: ProductfilterService) {}

  ngOnInit(): void {}

  cambiarfiltro(value: string) {
    this.filterService.enviarValorFiltro(value);
    this.valorFiltro = value;
  }
}
