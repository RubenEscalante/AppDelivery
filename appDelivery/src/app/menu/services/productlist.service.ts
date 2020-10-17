import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Products} from 'src/app/menu/models/products';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ProductlistService {
  productList: AngularFireList<any>;
  constructor(private http: HttpClient, public firebase: AngularFireDatabase) {
  }

  getProductos() {
   // return this.http.get<Products>('data/productos.json');
   return this.productList = this.firebase.list('productos');
  }
  setProductos(){

  }
}
