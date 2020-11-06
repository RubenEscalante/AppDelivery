import { Component, OnInit } from '@angular/core';
import {Global} from '../../../common/global';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  global: Global;

  constructor(global:Global) { this.global=global;}

  ngOnInit(): void {
  }

}
