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
  newAuthor = {};
  response: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) { }

  ngOnInit() {
    this.newAuthor = { name: '' };
  }

  onSubmitNew(event){
  	// CODE TO SUBMIT FORM AND SEND TO DB
    event.preventDefault();
    // code to send off the form data (this.newTask) to the service
    // console.log("Updated newTask", this.newTask);
    let observable = this._httpService.createAuthor(this.newAuthor);
    observable.subscribe(data => {
      // console.log("newAuthor subscribe to Observable", data.json());
      this.response = data.json();
    // then reset this.newAuthor to new, clean object.
      this.newAuthor = { name: '' };
      // this._router.navigate(['/home']);
      // can re-route home but i chose to stay on the page, clear the form, and show validations
    })
  }
}
