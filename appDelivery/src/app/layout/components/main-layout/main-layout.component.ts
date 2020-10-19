import { Component, OnInit } from '@angular/core';
import {MenucartService} from '../../../menu/services/menucart.service';

//Componentes para mostrar modal
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginmodalComponent} from '../../../autentificacion/loginmodal/loginmodal.component'
import {AuthService} from '../../../autentificacion/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  ///totalCartItem: number;
  constructor(public menuCartservice: MenucartService, 
              private modalService: NgbModal,
              public authService: AuthService) {}

  ngOnInit(): void {
   // this.totalCartItem = this.menuCartservice.getCartLength(); //Para despues
  }

  abrirModalParaAutentificarse(){ 
    const modalRef =this.modalService.open(LoginmodalComponent, {size:<any>'md'});     
  }

}
