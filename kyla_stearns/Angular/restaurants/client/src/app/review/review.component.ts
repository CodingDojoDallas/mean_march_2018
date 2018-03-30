import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews = [];
  restaurantID: any;
  currentRestaurant: any;
  response: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.restaurantID = params['id'];
      // console.log("inside reviewInit with params id", params['id']);
      let observable = this._httpService.getAllReviews(params['id']);
      observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
        data = data.json();
        // console.log("Got our reviews!", data);  // inject HttpService as dependency
        // console.log( "This is all_reviews of data", data['all_reviews']);
        // console.log("this is the current restaurant name", data['restaurant_name']);
  	    this.currentRestaurant = data['restaurant_name'];
	      this.reviews = data['all_reviews'];
    	});
  	});
  }

}
