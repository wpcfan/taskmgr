import { 
  Component, 
  Input,
  Output,
  AfterViewInit,
  OnDestroy,
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
export class TaskListComponent implements AfterViewInit, OnDestroy{
  
  @Input() 
  list: TaskList;
  loading$: Observable<boolean>;
  tasks$: Observable<Task[]>;
  taskForm$: Observable<any>;
  taskCount: number;
  private user: User;
  constructor(
    private dialog: MdDialog,
    private store$: Store<fromRoot.State>) { 
      this.loading$ = this.store$.select(fromRoot.getTaskLoading);
    }
  
  ngAfterViewInit(){
    // 由于@Input 是在 Init 时候才设置进来的，这句要放在这里
    // 如果在 constructor 中会报错
    this.store$.dispatch(new taskActions.LoadTasksAction(this.list.id));
    this.tasks$ = this.store$
      .select(fromRoot.getTasks)
      .map(tasks => tasks.filter(task => task.taskListId === this.list.id));
  }

  ngOnDestroy(){
  }

  onChangeListName(list: TaskList){
    this.dialog.open(NewTaskListComponent, {data: {
      taskList: Object.assign({}, list)
    }})
  }

  onAddListAfter(){
  }

  onCopyAllTasks(){
    
  }

  onMoveAllTasks(){
    
  }

  onDeleteList(){
    
  }

  onTaskComplete(){
    
  }

  onTaskClick(task: Task){
    this.store$.dispatch(new taskFormActions.PrepareUpdateAction(task));
    this.dialog.open(NewTaskComponent);
  }

  addNewTask(){
    this.store$.dispatch(new taskFormActions.PrepareAddAction(this.list.id));
    this.dialog.open(NewTaskComponent);
  }
}
