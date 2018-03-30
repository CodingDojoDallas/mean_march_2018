import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  thisRestaurant = {};
  response: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) { }

  ngOnInit() {
  	this.response = {name: '', cuisine: ''};
  	this._route.params.subscribe((params: Params) => {
  		// console.log("inside editInit with params id", params['id']);
  		let observable = this._httpService.editRestaurant(params['id']);
      observable.subscribe(data => {
        // console.log("edit restaurant subscribe to Observable", data.json());
        data = data.json();
    		// console.log("Data from this thisRestaurant", data['this_restaurant']);
        this.thisRestaurant = {
          id: params['id'], 
          name: data['this_restaurant'].name, 
          cuisine: data['this_restaurant'].cuisine
        };
      });
  	});
  }

  onSubmitEdit(event){
    event.preventDefault();
    // console.log("Inside onSubmitEdit function with thisRestaurant", this.thisRestaurant);
    // code to send off the form data (this.thisRestaurant) to the service
    let observable = this._httpService.updateRestaurant(this.thisRestaurant);
    observable.subscribe((data:any) => {
      data = data.json();
      // console.log("thisRestaurant subscribe to Observable", data);
      if (data.message){
        this.response = data.message.errors;
        // console.log(this.response, "response");
      }
      else{
      // then reset this.thisRestaurant to new, clean object.
        this.thisRestaurant = {id: '', name: '', cuisine: '' };
        this._router.navigate(['']);
      }
    })
  }
}