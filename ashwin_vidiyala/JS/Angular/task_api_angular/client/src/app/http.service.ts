import { Injectable }  from '@angular/core';
import { Http }        from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private _http: Http) {
    // this.getTasks();
  }

  getTasks() {
    return this._http.get('/tasks');

    // let tempObservable = this._http.get('/tasks');
    // tempObservable.subscribe( (data) => {
    //   let tasks_array = data.json().tasks;
    //   for (let i = 0; i < tasks_array.length; i++) {
    //     let task_id = tasks_array[i]._id;
    //     let taskObservable = this._http.get(`/tasks/${task_id}`);
    //     taskObservable.subscribe( (task) => {
    //       console.log(`Title #${i+1}: ${task.json().data.title}`);
    //     })
    //   }
    // })
  }

  addTask(newTask) {
    return this._http.post('/tasks', newTask);
  }

  editTask(task) {
    return this._http.put(`/tasks/${task._id}`, task);
  }

  deleteTask(task) {
    return this._http.delete(`/tasks/${task._id}`, task);
  }
}
