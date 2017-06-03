import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, TaskList} from '../../domain';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() loading: boolean;
  @Input() darkTheme: boolean;
  @Input() list: TaskList;
  @Input() tasks: Task[];
  @Output() dragTask = new EventEmitter<string>();
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

  handleDragging(taskId: string) {
    this.dragTask.emit(taskId);
  }
}
