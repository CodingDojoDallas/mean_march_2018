import { Component, OnInit } from '@angular/core';
import { ProductService }    from '../../product.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  product: Object;
  error;

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.product = {
      title: '',
      price: '',
      image: ''
    }
    this.error = {title: '', price: '', image: ''};
  }

  createProduct(event) {
    event.preventDefault();
    const observable = this._productService.createProduct(this.product);
    observable.subscribe(
      (res) => {
        this._router.navigate(['/list']);
      },
      (err) => {
        this.error = err.json().errors;
      }
    )
  }
}
