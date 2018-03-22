import { Component, OnInit }       from '@angular/core';
import { ProductService }          from '../../product.service';
import { ActivatedRoute, Router }  from '@angular/router'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product = {
    id: '',
    title: '',
    price: '',
    image: ''
  }
  error;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProduct();
    this.error = {id: '', title: '', price: '', image: ''};
  }

  getProduct() {
    this._route.params.subscribe( (params) => {
      let observable = this._productService.getProduct(params['id']);
      observable.subscribe(
        (res) => {
          this.product.id = res.json().data._id;
          this.product.title = res.json().data.title;
          this.product.price = res.json().data.price;
          this.product.image = res.json().data.image;
        },
        (err) => {
          console.log(err);
        }
      )
    })
  }

  editProduct(event) {
    event.preventDefault();
    let observable = this._productService.editProduct(this.product.id, this.product);
    observable.subscribe(
      (res) => {
        this._router.navigate(['/list']);
      },
      (err) => {
        this.error = err.json().errors;
      }
    );
  }

}
