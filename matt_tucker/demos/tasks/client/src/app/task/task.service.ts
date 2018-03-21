import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Task } from './task';

@Injectable()
export class TaskService {
  task: Task;

  constructor(private _http: Http) { }

  retrieveTasks() {
      return this._http.get('/tasks');
  }

  retrieveTask(id) {
      return this._http.get(`/tasks/${id}`)
  }

  storeTask(task) {
      this.task = task;
  }

  create(task) {
    return this._http.post('/tasks', task);
  }

}
