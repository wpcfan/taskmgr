import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, TaskList} from '../../domain';

@Component({
  selector: 'app-task-list',
  template: `
    <md-list>
      <app-task-list-header
        [header]="list.name"
        [darkTheme]="darkTheme"
        (newTask)="addNewTask()"
        (changeListName)="onChangeListName()"
        (deleteList)="onDeleteList()"
        (moveAllTasks)="onMoveAllTasks()">
      </app-task-list-header>
      <md-divider></md-divider>
      <md-progress-bar color="primary" mode="indeterminate" *ngIf="loading else listItems">
      </md-progress-bar>
    </md-list>
    <ng-template #listItems>
      <md-divider></md-divider>
      <app-task-item
        *ngFor="let task of tasks"
        md-line
        [item]="task"
        (taskComplete)="onTaskComplete(task)"
        (taskClick)="onTaskClick(task)">
      </app-task-item>
    </ng-template>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() loading: boolean;
  @Input() darkTheme: boolean;
  @Input() list: TaskList;
  @Input() tasks: Task[];
  @Output() delList = new EventEmitter<TaskList>();
  @Output() moveList = new EventEmitter<string>();
  @Output() renameList = new EventEmitter<TaskList>();
  @Output() completeTask = new EventEmitter<Task>();
  @Output() addTask = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<Task>();

  constructor() { }

  onChangeListName() {
    this.renameList.emit(this.list);
  }

  onMoveAllTasks() {
    this.moveList.emit(this.list.id);
  }

  onDeleteList() {
    this.delList.emit(this.list);
  }

  onTaskComplete(task: Task) {
    this.completeTask.emit(task);
  }

  onTaskClick(task: Task) {
    this.updateTask.emit(task);
  }

  addNewTask() {
    this.addTask.emit(this.list.id);
  }

}
