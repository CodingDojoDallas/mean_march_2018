import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskNewComponent } from './task/task-new/task-new.component';

// SERVICES
import { TaskService } from './task/task.service';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskShowComponent } from './task/task-show/task-show.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskNewComponent,
    TaskListComponent,
    TaskShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
