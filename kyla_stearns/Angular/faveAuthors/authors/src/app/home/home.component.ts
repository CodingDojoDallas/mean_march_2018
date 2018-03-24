import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors = [];
  response: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
  	this.getAuthors();
  }

  getAuthors(){
  	let observable = this._httpService.getAllAuthors();
    observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
      data = data.json();
      // console.log("Got our authors!", data);  // inject HttpService as dependency
      // console.log( "This is all_authors of data", data['all_authors']);
      this.authors = data['all_authors'];
    });
  }

  deleteAuthor(id){
    console.log("inside component delete with id", id);
    let observable = this._httpService.deleteAuthor(id);
    observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
      // console.log("deleteAuthor subscribe to Observable", data.json());
      this.response = data.json();  // inject HttpService as dependency
      this.getAuthors();
      // this._router.navigate(['/']);
      // can re-route home but i chose to stay on the page, clear the form, and show validations
    }); 
  }
}