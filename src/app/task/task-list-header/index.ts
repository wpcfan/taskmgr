import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/material';

@Component({
  selector: 'app-task-list-header',
  template: `
    <div md-subheader class="header-container">
      <div class="header-label">
        <h3>{{header}}</h3>
      </div>
      <div class="middle-btn">
        <button md-button (click)="addNewTask($event)">
          <md-icon>add_circle_outline</md-icon>
          <span>新任务</span>
        </button>
      </div>
      <div class="right-btn">
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
    .material-icon{
      line-height: 32px;
    }

    .header-container{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      align-content: space-around;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListHeaderComponent implements OnInit {
  @Output() changeListName = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() moveAllTasks = new EventEmitter<void>();
  @Output() newTask = new EventEmitter<void>();
  @Input() header = '';
  @Input() darkTheme = false;

  constructor(private oc: OverlayContainer) {
  }

  ngOnInit() {
    this.oc.themeClass = this.darkTheme ? 'myapp-dark-theme' : null;
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
