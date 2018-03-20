import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; // import Http

@Injectable()
export class HttpService{
	constructor(private _http: Http){  // inject Http as dependency
		// this.getTasks();  // invoke getTasks function to fetch from database upon creation
	}
	getAllTasks(){
		console.log("Inside getAllTasks function");
		// our http response is an Observable, store it in a variable
		// let tempObservable = this._http.get('/tasks');
		// subscribe to the Observable and provide the code we would like to do with our data from the response
		// tempObservable.subscribe(data => console.log("Got our tasks!", data));
		return this._http.get('/tasks'); // return the Observable
	} 

	createTask(newTask){
		console.log("Inside createTask function with newTask", newTask);
  		return this._http.post('/tasks/new', newTask);
	}

	editTask(id){
		console.log("Inside editTask function with id", id);
		return this._http.get('/tasks/edit/'+id); // return the Observable
	}

	updateTask(editTask){
		console.log("Inside updateTask function with editTask", editTask);
		return this._http.put('/tasks/update/'+editTask.id, editTask); // return the Observable
	}

	deleteTask(id){
		console.log("Inside deleteTask function with id", id);
		return this._http.delete('/tasks/'+id); // return the Observable
	} 
}

