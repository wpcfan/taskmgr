import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {TaskListComponent} from './task-list';
import {TaskItemComponent} from './task-item';
import {TaskRoutingModule} from './task-routing.module';
import {TaskHomeComponent} from './task-home';
import {TaskListHeaderComponent} from './task-list-header';
import {NewTaskComponent} from './new-task';
import {NewTaskListComponent} from './new-task-list';
import {CopyTaskComponent} from './copy-task';
import {QuickTaskComponent} from './quick-task';

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
    CopyTaskComponent,
    QuickTaskComponent,
  ],
  entryComponents: [
    NewTaskComponent,
    NewTaskListComponent,
    CopyTaskComponent
  ]
})
export class TaskModule {
}
