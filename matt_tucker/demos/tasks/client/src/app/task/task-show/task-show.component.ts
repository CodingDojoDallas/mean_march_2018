import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.css']
})
export class TaskShowComponent implements OnInit {
  task: Task;

  constructor(
      private _taskService: TaskService,
      private _route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.task = this._taskService.task;

      // this._route.params.subscribe( (params) => {
      //     const id = params.id;

      //     let observable = this._taskService.retrieveTask(id);
      //     observable.subscribe( (res) => {
      //         const task = res.json();

      //         console.log(task);

      //         this.task = task;
      //     });
      // });

  }

}
