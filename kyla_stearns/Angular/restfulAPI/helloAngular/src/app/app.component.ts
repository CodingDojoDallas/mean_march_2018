import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';  // import HttpService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  tasks = [];
  newTask = {};
  thisTask = {};
  hidden = true;

  constructor(private _httpService: HttpService){}  // inject HttpService as dependency

  ngOnInit(){
    this.newTask = { title: '', description: '' };
    this.thisTask = { id: '', title: '', description: ''};
  	this.getAllTasks();
  }

  getAllTasks(){
    let observable = this._httpService.getAllTasks();  // get the Observable and store it in variable
    observable.subscribe(data => {     // subscribe to Observable in order to get updates when you receive a response
      data = data.json();
      console.log("Got our tasks!", data);  // inject HttpService as dependency
      console.log( "This is all_tasks of data", data['all_tasks'][0]);
      this.tasks = data['all_tasks'];
      console.log( "This is my new tasks array", this.tasks);
    });
  }

  onSubmitNew(event){
    console.log("Inside onSubmitNew function with new task", event);
    event.preventDefault();
    // code to send off the form data (this.newTask) to the service
    // console.log("Updated newTask", this.newTask);
    let observable = this._httpService.createTask(this.newTask);
    observable.subscribe(data => {
      console.log("Got data from new_task submit", data);
      console.log("Successfully subscribed to createTask.");
    })
      // then reset this.newTask to new, clean object.
      this.newTask = { title: '', description: '' };
  }

  editThisTask(element){
    this.hidden = false;
    console.log("whole edit element object", element);
    this.thisTask = {id: element._id, title: element.title, description: element.description};
    console.log("New thisTask object", this.thisTask);
    let observable = this._httpService.editTask(element._id);
    observable.subscribe(data => {
      data = data.json();
      console.log("Got this task to edit", data);
    });
  }

  onSubmitEdit(event){
    event.preventDefault();
    console.log("Inside onSubmitEdit function with thisTask", this.thisTask);
    // code to send off the form data (this.thisTask) to the service
    let observable = this._httpService.updateTask(this.thisTask);
    observable.subscribe(data => {
      console.log("thisTask subscribe to Observable", data.json());
    })
    // then reset this.thisTask to new, clean object.
    this.thisTask = { id: '', title: '', description: ''};
  }

  deleteThisTask(id){
    let observable = this._httpService.deleteTask(id);
    observable.subscribe(data => {
      data = data.json();
      console.log("Got this task to delete", data);
    });
  }

}