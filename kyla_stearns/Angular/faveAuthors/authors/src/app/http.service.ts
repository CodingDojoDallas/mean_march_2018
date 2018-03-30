import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; // import Http

@Injectable()
export class HttpService{
	constructor(private _http: Http){  // inject Http as dependency
		// this.getTasks();  // invoke getTasks function to fetch from database upon creation
	}
	getAllAuthors(){
		// console.log("Inside getAllTasks function");
		// our http response is an Observable, store it in a variable
		// let tempObservable = this._http.get('/authors');
		// subscribe to the Observable and provide the code we would like to do with our data from the response
		// tempObservable.subscribe(data => console.log("Got our authors!", data));
		return this._http.get('/authors'); // return the Observable
	} 

	createAuthor(newAuthor){
		// console.log("Inside createAuthor function with newAuthor", newAuthor);
  		return this._http.post('/authors/new', newAuthor);
	}

	editAuthor(id){
		// console.log("Inside editAuthor function with id", id);
		return this._http.get('/authors/edit/'+id); // return the Observable
	}

	updateAuthor(editAuthor){
		// console.log("Inside updateAuthor function with editAuthor", editAuthor);
		return this._http.put('/authors/update/'+editAuthor.id, editAuthor); // return the Observable
	}

	deleteAuthor(id){
		// console.log("Inside deleteAuthor function with id", id);
		return this._http.delete('/authors/'+id); // return the Observable
	} 
}

