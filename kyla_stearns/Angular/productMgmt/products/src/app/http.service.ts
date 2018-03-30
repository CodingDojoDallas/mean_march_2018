import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; // import Http

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  getAllProducts(){
		console.log("Inside getAllProducts function");
		return this._http.get('/products'); 
	} 

	createProduct(newProduct){
		console.log("Inside createProduct function with newProduct", newProduct);
  		return this._http.post('/products/new', newProduct);
	}

	editProduct(id){
		console.log("Inside editProduct function with id", id);
		return this._http.get('/products/edit/'+id); 
	}

	updateProduct(editProduct){
		console.log("Inside updateProduct function with editProduct", editProduct);
		return this._http.patch('/products/update/'+editProduct.id, editProduct); 
	}

	deleteProduct(id){
		console.log("Inside deleteProduct function with id", id);
		return this._http.delete('/products/'+id); 
	} 
}

