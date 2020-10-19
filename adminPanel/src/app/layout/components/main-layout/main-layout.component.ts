import { Component, OnInit } from '@angular/core';
import {Global} from '../../../common/global';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  global: Global;

  constructor(global:Global) { 
    console.log('Main layout constructor called'); 
    this.global=global;
  }

  ngOnInit(): void {
    
  }

}
