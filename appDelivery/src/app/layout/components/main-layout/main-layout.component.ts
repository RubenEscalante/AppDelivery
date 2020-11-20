import { Component, OnInit } from '@angular/core';
import {MenucartService} from '../../../menu/services/menucart.service';

//Componentes para mostrar modal
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginmodalComponent} from '../../../autentificacion/loginmodal/loginmodal.component';
import {HistorialOrdenesComponent} from '../../../panel-usuario/components/historial-ordenes/historial-ordenes.component';
import {AuthService} from '../../../autentificacion/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  ///totalCartItem: number;
  usuario;
  constructor(public menuCartservice: MenucartService, 
              private modalService: NgbModal,
              public authService: AuthService) {}

  ngOnInit(): void {
   // this.totalCartItem = this.menuCartservice.getCartLength(); //Para despues
   this.usuario = JSON.parse(localStorage.getItem('user'));
   console.log(this.usuario.historial);
  }

  abrirModalParaAutentificarse(){ 
    const modalRef =this.modalService.open(LoginmodalComponent, {size:<any>'md'});     
  }

  abrirModalParaOrdenes(){
    const modalRef2 = this.modalService.open(HistorialOrdenesComponent, {size:<any>'xl'});  
  }
 

}
