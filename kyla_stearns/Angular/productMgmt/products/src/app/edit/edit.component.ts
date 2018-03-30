import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  thisProduct = {};
  response: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) { }

  ngOnInit() {
    this.thisProduct = {id: '', title: '', price: '', imgLink: ''};
  	this._route.params.subscribe((params: Params) => {
  		// console.log(Number(params['id']));
  		// this.id = params['id'];
      let observable = this._httpService.editProduct(params['id']);
      observable.subscribe(data =>{
        data = data.json();
  		  console.log("Data from this thisProduct", data['this_product']);
        this.thisProduct = {
          id: params['id'], 
          title: data.this_product.title, 
          price: Number(data.this_product.price), 
          imgLink: data.this_product.imgLink
        }; 
      });
  	});
  }

  onSubmitEdit(event){
    event.preventDefault();
    console.log("Inside onSubmitEdit function with thisProduct", this.thisProduct);
    // code to send off the form data (this.thisProduct) to the service
    let observable = this._httpService.updateProduct(this.thisProduct);
    observable.subscribe(data => {

      console.log("thisProduct subscribe to Observable", data.json());
      this.response = data.json();
      // console.log("You have successfully updated this product.", this.thisProduct);
      // then reset this.thisProduct to new, clean object.
        this.thisProduct = {id: '', title: '', price: '', imgLink: ''};
        this._router.navigate(['/products']);

    // THIS IS WHAT YOU WOULD USE IF YOU DECIDE TO CHANGE SERVER SIDE TO USE STATUS(400) ERROR
    // observable.subscribe( (res: any) => {
    //   this.thisAuthor = {id: '', name: ''};
    //   }; 
    //   ( (err: any) => { 
    //     this.response = err.error.errors.field_name.message; 
    //   }));
        
      }

    });
  }
}