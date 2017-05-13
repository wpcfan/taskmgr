import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { TaskListComponent } from './task-list';
import { TaskItemComponent } from './task-item';
import { TaskRoutingModule } from "./task-routing.module";
import { TaskHomeComponent } from './task-home/task-home.component';
import { DragDropService } from "./drag-drop.service";
import { TaskListHeaderComponent } from './task-list-header';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [
    DraggableDirective,
    DroppableDirective,
    TaskListComponent, 
    TaskItemComponent, 
    TaskHomeComponent, TaskListHeaderComponent,
  ],
  providers: [ DragDropService ]
})
export class TaskModule { }
