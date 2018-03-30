import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants = [];
  response: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
  	this.getRestaurants();
  }

  getRestaurants(){
  	let observable = this._httpService.getAllRestaurants();
    observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
      data = data.json();
      // console.log("Got our restaurants!", data);  // inject HttpService as dependency
      // console.log( "This is all_restaurants of data", data['all_restaurants']);
      this.restaurants = data['all_restaurants'];
    });
  }

  deleteRestaurant(id){
    // console.log("inside component delete with id", id);
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
      // console.log("deleteRestaurant subscribe to Observable", data.json());
      this.response = data.json();  // inject HttpService as dependency
      this._router.navigate(['/home']);
      // location.reload();
      // this.getRestaurants();
    }); 
  }

}
