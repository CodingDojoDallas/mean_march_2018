import { Component, OnInit }    from '@angular/core';
import { HttpService }          from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  tasks = [];
  current_task = {};
  hidden = '';
  show_edit_form = false;
  newTask = {
    title: '',
    description: ''
  };

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getTasksFromService();
  }

  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe( (data) => {
      this.tasks = data.json().tasks;
    })
  }

  addTask($event) {
    $event.preventDefault();
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe();
    this.newTask = {
      title: '',
      description: ''
    };
  }

  editTask($event) {
    $event.preventDefault();
    let observable = this._httpService.editTask(this.current_task);
    observable.subscribe();
    this.getTasksFromService();
  }

  showEditForm($event, title, description, _id) {
    $event.preventDefault();
    this.current_task = {
      title: title,
      description: description,
      _id: _id
    }
    this.show_edit_form = true;
  }

  deleteTask($event, title, description, _id) {
    $event.preventDefault();
    let task = {
      title: title,
      descriptin: description,
      _id: _id
    }
    let observable = this._httpService.deleteTask(task);
    observable.subscribe();
  }
}
