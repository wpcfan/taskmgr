import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TaskListComponent, TaskItemComponent]
})
export class TaskModule { }
