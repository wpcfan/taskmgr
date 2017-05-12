import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { TaskListComponent } from './task-list';
import { TaskItemComponent } from './task-item';
import { TaskRoutingModule } from "./task-routing.module";

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [TaskListComponent, TaskItemComponent]
})
export class TaskModule { }
