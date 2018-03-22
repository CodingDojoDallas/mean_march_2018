import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get('/products');
  }

  createProduct(product) {
    return this._http.post('/products', product);
  }

  getProduct(id) {
    return this._http.get(`/products/${id}`);
  }

  editProduct(id, product) {
    return this._http.put(`/products/${id}`, product);
  }

  deleteProduct(id) {
    return this._http.delete(`/products/${id}`);
  }
}
