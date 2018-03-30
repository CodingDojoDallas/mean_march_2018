import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {
  newReview = {};
  response: any;
  currentRestaurant: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
	   // console.log("inside NEW reviewInit with params id", params['id']);
      this.response = {name: '', content: ''};
      this.newReview = {
        _restaurant: params['id'],  
        name: '', 
        rank: 1,
        content: '' 
      };
      let observable = this._httpService.getName(params['id']);
      observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
        data = data.json();
        // console.log("this is the current restaurant name", data['restaurant_name']);
        this.currentRestaurant = data['restaurant_name'];
      });
  	});
  }

  onSubmitNew(event){
  	// CODE TO SUBMIT FORM AND SEND TO DB
    event.preventDefault();
    // code to send off the form data (this.newReview) to the service
    // console.log("Updated newReview", this.newReview);
    let observable = this._httpService.createReview(this.newReview);
    observable.subscribe((data:any) => {
      data = data.json();
      // console.log("newReview subscribe to Observable", data);
      if(data.message){
        this.response = data.message.errors;
        // console.log(this.response, "response");
      }
      else{
        // then reset this.newReview to new, clean object.
        // console.log(this.newReview._restaurant, "this.newReview");
        this._router.navigate(['/reviews/'+this.newReview._restaurant]);
        this.newReview = {
          _restaurant: '',  
          name: '', 
          rank: 1, 
          content: '' 
        };
      }
    })
  }

}
