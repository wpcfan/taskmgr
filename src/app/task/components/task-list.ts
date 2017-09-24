import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-task-list',
  template: `
    <mat-list>
      <ng-content></ng-content>
    </mat-list>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {}
