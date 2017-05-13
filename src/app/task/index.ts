import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { TaskListComponent } from './task-list';
import { TaskItemComponent } from './task-item';
import { TaskRoutingModule } from "./task-routing.module";
import { TaskHomeComponent } from './task-home';
import { TaskListHeaderComponent } from './task-list-header';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskListComponent, 
    TaskItemComponent, 
    TaskHomeComponent, 
    TaskListHeaderComponent,
  ]
})
export class TaskModule { }
