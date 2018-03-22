import { Component, OnInit } from '@angular/core';
import { ProductService }    from '../../product.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products;

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.products = [];
    this.getProducts();
  }

  getProducts() {
    let observable = this._productService.getProducts();
    observable.subscribe(
      (res) => {
        this.products = res.json().data;
      },
      (err) => {
        console.log(err.json().data.message);
      }
    );
  }

  deleteProduct(id) {
    let observable = this._productService.deleteProduct(id);
    observable.subscribe(
      (res) => {
        this.getProducts();
      },
      (err) => {
        console.log(err.json());
      }
    )
  }
}
