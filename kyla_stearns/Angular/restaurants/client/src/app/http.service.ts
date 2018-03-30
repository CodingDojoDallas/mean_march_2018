import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  getAllRestaurants(){
  	// console.log("Inside getAllRestaurants function");
  	return this._http.get('/restaurants'); 
  } 

  createRestaurant(newRestaurant){
  	// console.log("Inside createRestaurant function with newRestaurant", newRestaurant);
  	return this._http.post('/restaurants/new', newRestaurant);
  }

  editRestaurant(id){
  	// console.log("Inside editRestaurant function with id", id);
  	return this._http.get('/restaurants/edit/'+id); 
  }

  updateRestaurant(editRestaurant){
  	// console.log("Inside updateRestaurant function with editRestaurant", editRestaurant);
  	return this._http.patch('/restaurants/update/'+editRestaurant.id, editRestaurant); 
  }

  deleteRestaurant(id){
  	// console.log("Inside deleteRestaurant function with id", id);
  	return this._http.delete('/restaurants/'+id); 
  } 

  getAllReviews(id){
    // console.log("Inside getAllReviews function", id);
    return this._http.get('/reviews/'+id); 
  }

  getName(id){
    // console.log("Inside getAllReviews function", id);
    return this._http.get('/name/'+id); 
  }

  createReview(newReview){
  	// console.log("Inside createReview function with newReview", newReview);
  	return this._http.post('/review/'+newReview._restaurant, newReview);
  }

}

