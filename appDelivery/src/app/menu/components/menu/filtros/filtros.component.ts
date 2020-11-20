import { Component, Input, OnInit } from '@angular/core';
import { ProductfilterService } from '../../../services/productfilter.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css', '../menu.component.css'],
})
<<<<<<< HEAD
export class FiltrosComponent implements OnInit { 
=======
export class FiltrosComponent implements OnInit {
>>>>>>> 4c8e37162b9fb662c0db9f3efcda2116dee0e6bd
  constructor(private filterService: ProductfilterService,
              private router: Router) {}

  ngOnInit(): void {}

  cambiarfiltro(value: string) {
    this.filterService.enviarValorFiltro(value);
    this.router.navigate(['menu/categorias'], { queryParams: { filtro: value } });
  }
}
