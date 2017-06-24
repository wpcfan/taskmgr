import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-task-list-header',
  template: `
    <div md-subheader class="header-container">
      <div>
        <h4>{{header}}</h4>
      </div>
      <div class="fill">
        <button md-button (click)="addNewTask($event)">
          <md-icon>add_circle_outline</md-icon>
          <span>新任务</span>
        </button>
      </div>
      <div>
        <button md-icon-button [mdMenuTriggerFor]="menu">
          <md-icon>keyboard_arrow_down</md-icon>
        </button>
      </div>
    </div>
    <md-menu #menu="mdMenu">
      <button md-menu-item (click)="onChangeListName($event)">
        <md-icon>mode_edit</md-icon>
        <span> 修改列表名称 </span>
      </button>
      <md-divider></md-divider>
      <button md-menu-item (click)="onMoveAllTasks($event)">
        <md-icon svgIcon="move" class="material-icon">content_copy</md-icon>
        <span> 移动本列表所有任务 </span>
      </button>
      <md-divider></md-divider>
      <button md-menu-item (click)="onDeleteList($event)">
        <md-icon>delete_forever</md-icon>
        <span> 删除列表 </span>
      </button>
    </md-menu>
  `,
  styles: [`
    .fill{
      flex: 1;
      text-align: center;
    }

    .header-container{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      align-content: center;
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
