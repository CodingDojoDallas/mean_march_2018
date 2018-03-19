import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from "../task"

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {

  task: Task;

  constructor(private _taskService: TaskService) { 
  }

  ngOnInit() {
      this.task = new Task();
  }

  onSubmit(event) {
    let observable = this._taskService.create(this.task);
    observable.subscribe( (res) => {
        this.task = new Task();

        const task = res.json();

        console.log(task);

    });
  }

}
