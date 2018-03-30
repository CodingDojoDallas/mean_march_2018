import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
  	this.getProducts();
  }

  getProducts(){
  	let observable = this._httpService.getAllProducts();
    observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
      data = data.json();
      console.log("Got our products!", data);  
      console.log( "This is all_products of data", data['all_products']);
      this.products = data['all_products'];
    });
  }

  deleteProduct(id){
    console.log("inside component delete with id", id);
    let observable = this._httpService.deleteProduct(id);
    observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
      console.log("deleteProduct subscribe to Observable", data.json());
      this.response = data.json();  // inject HttpService as dependency
      this.getProducts();
      // this._router.navigate(['/']);
      // can re-route home but i chose to stay on the page, clear the form, and show validations
    }); 
  }
}