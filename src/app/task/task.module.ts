import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskRoutingModule } from "./task-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule
  ],
  declarations: [TaskListComponent, TaskItemComponent]
})
export class TaskModule { }
