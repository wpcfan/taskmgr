import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-task-list',
  template: `
    <md-list>
      <ng-content></ng-content>
    </md-list>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {}
