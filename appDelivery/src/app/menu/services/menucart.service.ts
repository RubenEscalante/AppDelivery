import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenucartService {
  cart: any = [];
  actualCart: any = [];

  constructor() {
  }

  // tslint:disable-next-line:typedef
  //Agrega al localstorage los productos
  addToCar(items) {
    if (localStorage.getItem('cart') === null) {
      this.cart = [];
      this.cart.push(items);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      this.actualCart = this.getCartItems();
      let person = this.actualCart.find((person) => {
        return person.$key === items.$key && person.dough === items.dough;
      });
      if (person && person['quantity']) {
        person['quantity'] = person['quantity'] + items.quantity;
        localStorage.setItem('cart', JSON.stringify(this.actualCart));
      }
      if (person === undefined) {
        this.cart = [
          ...this.actualCart,
          items
        ];
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }

      // console.log('dato de person ', person);
    }
  }

  //Devuelve lo que esta actualmente en el localstorage
  getCartItems() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  getCartLength() {
    this.actualCart = this.getCartItems();
    if (localStorage.getItem('cart') === null) {
      return null;
    }
    return this.actualCart.length;
  }

}
