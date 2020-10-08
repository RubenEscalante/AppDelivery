import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Products} from 'src/app/menu/models/products';
@Injectable({
  providedIn: 'root'
})
export class ProductlistService {

  constructor(private http: HttpClient) {
  }

  getProductos() {
    return this.http.get<Products>('data/productos.json');
  }
}
