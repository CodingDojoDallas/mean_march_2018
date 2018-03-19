import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Task } from './task';

@Injectable()
export class TaskService {

  constructor(private _http: Http) { }

  retrieveTasks() {
      return this._http.get('/tasks');
  }

  create(task) {
    return this._http.post('/tasks', task);
  }

}
