import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-task-list-header',
  template: `
    <div matSubheader class="header-container" fxLayout="row" fxLayoutAlign="center center">
      <div>
        <h4>{{ header }}</h4>
      </div>
      <div class="fill" fxFlex>
        <button mat-button (click)="addNewTask($event)">
          <mat-icon>add_circle_outline</mat-icon>
          <span>新任务</span>
        </button>
      </div>
      <div>
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>keyboard_arrow_down</mat-icon>
        </button>
      </div>
    </div>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="onChangeListName($event)">
        <mat-icon>mode_edit</mat-icon>
        <span> 修改列表名称 </span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="onMoveAllTasks($event)">
        <mat-icon svgIcon="move" class="material-icon">content_copy</mat-icon>
        <span> 移动本列表所有任务 </span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="onDeleteList($event)">
        <mat-icon>delete_forever</mat-icon>
        <span> 删除列表 </span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .material-icon{
      line-height: 1;
    }

    .fill{
      text-align: center;
    }

    .header-container{
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListHeaderComponent {
  @Output() changeListName = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() moveAllTasks = new EventEmitter<void>();
  @Output() newTask = new EventEmitter<void>();
  @Input() header = '';

  constructor() {
  }

  onChangeListName(ev: Event) {
    ev.preventDefault();
    this.changeListName.emit();
  }

  onMoveAllTasks(ev: Event) {
    ev.preventDefault();
    this.moveAllTasks.emit();
  }

  onDeleteList(ev: Event) {
    ev.preventDefault();
    this.deleteList.emit();
  }

  addNewTask(ev: Event) {
    ev.preventDefault();
    this.newTask.emit();
  }
}
