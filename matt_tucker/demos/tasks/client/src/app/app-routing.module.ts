import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskNewComponent } from './task/task-new/task-new.component';
import { TaskShowComponent } from './task/task-show/task-show.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: TaskComponent, children: [
       { path: '', pathMatch: 'full', component: TaskListComponent }
    ]},
    { path: 'task', component: TaskComponent, children: [
        {path: '', pathMatch: 'full', component: TaskListComponent },
        { path: 'new', component: TaskNewComponent },
        { path: ':id', component: TaskShowComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
