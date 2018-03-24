import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  thisAuthor = {};
  response: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  ) { }

  ngOnInit() {
  	this.thisAuthor = {id: '', name: ''};
  	this._route.params.subscribe((params: Params) => {
  		// console.log(Number(params['id']));
  		// this.id = params['id'];
  		this.thisAuthor = {id: params['id'], name: this.thisAuthor.name};
  		this._httpService.editAuthor(this.thisAuthor);
  		console.log("Data from this thisAuthor", this.thisAuthor);
  	});
  }

  onSubmitEdit(event){
    event.preventDefault();
    console.log("Inside onSubmitEdit function with thisAuthor", this.thisAuthor);
    // code to send off the form data (this.thisAuthor) to the service
    let observable = this._httpService.updateAuthor(this.thisAuthor);
    observable.subscribe(data => {
      // console.log("thisAuthor subscribe to Observable", data.json());
      this.response = data.json();
      // console.log("You have successfully updated this author", this.thisAuthor);
      // then reset this.thisAuthor to new, clean object.
        this.thisAuthor = {id: '', name: ''};
        // this._router.navigate(['/home']);
        
      }

    })
  }

}
