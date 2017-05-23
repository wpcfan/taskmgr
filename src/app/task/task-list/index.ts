import { 
  Component, 
  Input,
  Output,
  AfterViewInit,
  HostListener,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { TaskList, Task } from '../../domain';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import * as fromRoot from '../../reducers';
import * as taskActions from '../../actions/task.action';
import * as listActions from '../../actions/task-list.action';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements AfterViewInit{

  taskCount: number;
  @Input() loading: boolean;
  @Input() list: TaskList;
  @Input() tasks: Task[];
  @Output() dragTask = new EventEmitter<string>();
  @Output() delList = new EventEmitter<TaskList>();
  @Output() moveList = new EventEmitter<string>();
  @Output() renameList = new EventEmitter<TaskList>();
  @Output() completeTask = new EventEmitter<Task>();
  @Output() addTask = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<Task>();
  constructor(
    private store$: Store<fromRoot.State>) { 
    }
  
  ngAfterViewInit(){
    // 由于@Input 是在 Init 时候才设置进来的，这句要放在这里
    // 如果在 constructor 中会报错
    this.store$.dispatch(new taskActions.LoadTasksAction(this.list.id));
  }

  onChangeListName(){
    this.renameList.emit(this.list)
  }

  onMoveAllTasks(){
    this.moveList.emit(this.list.id);
  }

  onDeleteList(){
    this.delList.emit(this.list);
  }

  onTaskComplete(task: Task){
    this.completeTask.emit(task);
  }

  onTaskClick(task: Task){
    this.updateTask.emit(task);
  }

  addNewTask(){
    this.addTask.emit(this.list.id);
  }

  handleDragging(taskId: string){
    this.dragTask.emit(taskId);
  }
}
