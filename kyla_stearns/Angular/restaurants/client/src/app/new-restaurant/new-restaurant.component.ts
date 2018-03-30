import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {
  newRestaurant = {};
  response: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) { }

  ngOnInit() {
    this.response = {name: '', cuisine: '', errmsg: ''};
  	this.newRestaurant = { name: '', cuisine: '' };
  }

  onSubmitNew(event){
  	// CODE TO SUBMIT FORM AND SEND TO DB
    event.preventDefault();
    this.response = {name: '', cuisine: '', errmsg: ''};
    // code to send off the form data (this.newRestaurant) to the service
    let observable = this._httpService.createRestaurant(this.newRestaurant);
    observable.subscribe((data:any) => {
      data = data.json();
      // console.log("newRestaurant subscribe to Observable", data);
      if(data.message){
        if(data.message.errors){
          // console.log("error submitting new restaurant", data.message.errors);
          this.response = data.message.errors;
          // console.log(this.response, "response");
        }
        else{
          // console.log("UNIQUE error submitting new restaurant", data.message.errmsg);
          this.response.name = {message: "This restaurant has already been registered."}
        }
      }
      else{
        // console.log("Getting inside else to navigate home");
        this.newRestaurant = { name: '', cuisine: '' };
        this._router.navigate(['/home']);
      }
    });
  }
}