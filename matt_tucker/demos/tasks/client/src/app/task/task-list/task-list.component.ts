import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(
    private _taskService: TaskService,
    private _router: Router
  ) { }

  ngOnInit() {
    let observable = this._taskService.retrieveTasks();
    observable.subscribe( (res) => {
        const tasks = res.json();

        this.tasks = tasks;
    });
  }

  showTask(index) {
    const task = this.tasks[index];

    this._taskService.storeTask(task);

    //this._router.navigate(['/task', task._id])
  }

}
