import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { TaskListComponent } from './components/task-list';
import { TaskItemComponent } from './components/task-item';
import { TaskRoutingModule } from './task-routing.module';
import { TaskHomeComponent } from './containers/task-home';
import { TaskListHeaderComponent } from './components/task-list-header';
import { NewTaskComponent } from './components/new-task';
import { NewTaskListComponent } from './components/new-task-list';
import { CopyTaskComponent } from './components/copy-task';
import { QuickTaskComponent } from './components/quick-task';
import { TaskHistoryItemComponent } from './components/task-history-item';
import { TaskFilterNavComponent } from './components/task-filter-nav';
import { ProjectMenuNavComponent } from './components/project-menu-nav';
import { UnassignedTaskListComponent } from './components/task-list-dialog/unassigned-task-list.component';
import { TodayTaskListComponent } from './components/task-list-dialog/today-task-list.component';
import { TaskListDialogItemComponent } from './components/task-list-dialog/task-list-dialog-item.component';

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
    TaskHistoryItemComponent,
    TaskFilterNavComponent,
    ProjectMenuNavComponent,
    UnassignedTaskListComponent,
    TodayTaskListComponent,
    TaskListDialogItemComponent,
  ],
  entryComponents: [
    NewTaskComponent,
    NewTaskListComponent,
    CopyTaskComponent,
    UnassignedTaskListComponent,
    TodayTaskListComponent,
  ]
})
export class TaskModule {
}
