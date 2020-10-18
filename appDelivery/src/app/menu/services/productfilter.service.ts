import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductfilterService {
  valorFiltro: string;
  private enviarValorFiltroSubject = new Subject<string>();
  enviarMensajeObservable = this.enviarValorFiltroSubject.asObservable();

  constructor() {}

  enviarValorFiltro(valor: string) {
    this.valorFiltro = valor;
    this.enviarValorFiltroSubject.next(this.valorFiltro);
  }
}
