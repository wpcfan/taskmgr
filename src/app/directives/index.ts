import { NgModule } from '@angular/core';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';
import { DragDropService, DragData } from './drag-drop.service';
import { ScrollMonitorDirective } from './scroll-monitor/scroll-monitor.directive';

@NgModule({
  providers: [
    DragDropService
  ],
  declarations: [
    DragDirective,
    DropDirective,
    ScrollMonitorDirective
  ],
  exports: [
    DragDirective,
    DropDirective,
    ScrollMonitorDirective
  ]
})
export class DirectivesModule {}
export {DragData};
