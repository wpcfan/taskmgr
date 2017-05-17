import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { TaskListComponent } from './task-list';
import { TaskItemComponent } from './task-item';
import { TaskRoutingModule } from "./task-routing.module";
import { TaskHomeComponent } from './task-home';
import { TaskListHeaderComponent } from './task-list-header';
import { NewTaskComponent } from "./new-task";
import { NewTaskListComponent } from './new-task-list';

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
    NewTaskComponent,
    NewTaskListComponent,
  ],
  entryComponents: [NewTaskComponent, NewTaskListComponent]
})
export class TaskModule { }
