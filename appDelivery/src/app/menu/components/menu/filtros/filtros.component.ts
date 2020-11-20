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
  
  valorFiltro: string = "pupusas";

  constructor(private filterService: ProductfilterService) {}
=======
export class FiltrosComponent implements OnInit { 
  constructor(private filterService: ProductfilterService,
              private router: Router) {}
>>>>>>> napote

  ngOnInit(): void {}

  cambiarfiltro(value: string) {    
    this.filterService.enviarValorFiltro(value);
    this.router.navigate(['menu/categorias'], { queryParams: { filtro: value } });
    

  }
<<<<<<< HEAD
 
=======

>>>>>>> napote
}
