import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// not really using params in this case, but easy to bring in in case want to change later 

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct = {};
  response: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) { }

  ngOnInit() {
    this.newProduct = {id: '', title: '', price: '', imgLink: ''};
  }
  onSubmitNew(event){
  	// CODE TO SUBMIT FORM AND SEND TO DB
    event.preventDefault();
    // code to send off the form data (this.newProduct) to the service
    // console.log("Updated newProduct", this.newProduct);
    let observable = this._httpService.createProduct(this.newProduct);
    observable.subscribe(data => {
      // console.log("newProduct subscribe to Observable", data.json());
      this.response = data.json();
    // then reset this.newProduct to new, clean object.
      this.newProduct = {id: '', title: '', price: '', imgLink: ''};
      // this._router.navigate(['/home']);
      // can re-route home but i chose to stay on the page, clear the form, and show validations
    
    // THIS IS WHAT YOU WOULD USE IF YOU DECIDE TO CHANGE SERVER SIDE TO USE STATUS(400) ERROR
    // observable.subscribe( (res: any) => {
    //   this.thisAuthor = {id: '', name: ''};
    //   }; 
    //   ( (err: any) => { 
    //     this.response = err.error.errors.field_name.message; 
    //   }));

    })
  }
}
