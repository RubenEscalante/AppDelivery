import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {

  constructor(private http: HttpClient) {
  }

  getProductos() {
    return this.http.get('data/productos.json');
  }
}
