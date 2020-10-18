import { Component, OnInit } from '@angular/core';
import {MenucartService} from '../../../menu/services/menucart.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  ///totalCartItem: number;
  constructor(public menuCartservice: MenucartService) { console.log('Main layout constructor called'); }

  ngOnInit(): void {
   // this.totalCartItem = this.menuCartservice.getCartLength(); //Para despues
  }

}
