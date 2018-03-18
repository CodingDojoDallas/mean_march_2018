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
  editTask = {};
  hidden = true;

  constructor(private _httpService: HttpService){}  // inject HttpService as dependency

  ngOnInit(){
    this.newTask = { title: '', description: '' };
    this.editTask = { id: '' };
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
    // this.newTask['title'] = postData['newTaskTitle'];
    // this.newTask['description'] = postData['newTaskDescription'];
    // console.log(this.newTask);
    let observable = this._httpService.createTask(this.newTask);
    observable.subscribe(data => {
      // data = data.json();
      console.log("got data from new_task submit", data);
    })
      // then reset this.newTask to new, clean object.
      this.newTask = { title: '', description: '' };

  }

  editThisTask(id){
    this.hidden = false;
    this.editTask = {id: id};
    let observable = this._httpService.editTask(id);
    observable.subscribe(data => {
      data = data.json();
      console.log("Got this task to edit", data);
    });
  }

  onSubmitEdit(event, thisTaskId){
    event.preventDefault();
    // code to send off the form data (this.editTask) to the service
    // console.log(thisTaskId);
    let observable = this._httpService.updateTask(thisTaskId, this.editTask);
    observable.subscribe(data => {
      console.log("editTask subscribe to Observable", data.json());
    })
  }

  deleteThisTask(id){
    let observable = this._httpService.deleteTask(id);
    observable.subscribe(data => {
      data = data.json();
      console.log("Got this task to delete", data);
    });
  }

}