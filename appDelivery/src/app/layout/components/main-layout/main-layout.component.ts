import { Component, OnInit } from '@angular/core';
import {MenucartService} from '../../../menu/services/menucart.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(public menuCartservice: MenucartService) { console.log('Main layout constructor called'); }

  ngOnInit(): void {
  }

}
