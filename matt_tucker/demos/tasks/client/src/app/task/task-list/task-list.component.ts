import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(private _taskService: TaskService) { }

  ngOnInit() {
    let observable = this._taskService.retrieveTasks();
    observable.subscribe( (res) => {
        const tasks = res.json();

        this.tasks = tasks;
    });
  }

}
