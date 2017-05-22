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
import * as taskFormActions from '../../actions/task-form.action';
import { Store } from "@ngrx/store";
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task';
import { NewTaskListComponent } from "../new-task-list";
import { User } from "../../domain";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements AfterViewInit{
  draggingStatus: string;
  dragTaskId:string;
  taskCount: number;
  @Input() loading: boolean;
  @Input() list: TaskList;
  @Input() tasks: Task[];
  @Output() moveTask = new EventEmitter<{taskId:string; taskListId: string}>();
  @Output() delList = new EventEmitter<TaskList>();
  @Output() moveList = new EventEmitter<string>();
  @Output() copyList = new EventEmitter<string>();
  @Output() completeTask = new EventEmitter<string>();
  @Output() renameList = new EventEmitter<TaskList>();
  private user: User;
  constructor(
    private dialog: MdDialog,
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

  onCopyAllTasks(){
    this.copyList.emit(this.list.id);
  }

  onMoveAllTasks(){
    this.moveList.emit(this.list.id);
  }

  onDeleteList(){
    this.delList.emit(this.list);
  }

  onTaskComplete(taskId: string){
    this.completeTask.emit(taskId);
  }

  onTaskClick(task: Task){
    this.store$.dispatch(new taskFormActions.PrepareUpdateAction(task));
    this.dialog.open(NewTaskComponent);
  }

  addNewTask(){
    this.store$.dispatch(new taskFormActions.PrepareAddAction(this.list.id));
    this.dialog.open(NewTaskComponent);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e){
    e.preventDefault();
    this.draggingStatus = 'enter';
  }

  @HostListener('drop', ['$event'])
  onDrop(e){
    this.draggingStatus = 'drop';
    if(this.dragTaskId){
      this.moveTask.emit({taskId: this.dragTaskId, taskListId: this.list.id});
    }
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(e){
    this.draggingStatus = 'enter';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e){
    this.draggingStatus = 'leave';
  }

  handleDragging(taskId: string){
    this.dragTaskId = taskId;
  }
}
