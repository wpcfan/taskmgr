import { 
  Component, 
  Input,
  Output,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as models from '../../domain';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task.action';
import { Store } from "@ngrx/store";
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task';
import { User } from "../../domain";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit, OnDestroy{
  
  @Input() 
  list: models.TaskList;
  loading$: Observable<boolean>;
  tasks$: Observable<models.Task[]>;
  private userSub: Subscription;
  private user: User;
  constructor(
    private dialog: MdDialog,
    private store$: Store<fromRoot.State>) { 
      this.loading$ = this.store$.select(fromRoot.getTaskLoading);
      this.userSub = this.store$.select(fromRoot.getAuth)
        .subscribe(auth => this.user = auth.user);
    }
  
  ngOnInit(){
    // 由于@Input 是在 Init 时候才设置进来的，这句要放在这里
    // 如果在 constructor 中会报错
    this.store$.dispatch(new actions.LoadTasksAction(this.list.id));
    this.tasks$ = this.store$
      .select(fromRoot.getTasks)
      // 此处需要小心 Observable 的 filter 和数组的 filter 此处的作用是不同的
      // 数组的 filter 返回的新数组需要长度大于 0 才满足 true/false
      // 很容易直接写成 .filter(tasks => tasks.filter(...) 
      // 但这样就变成判断返回数组是否不为空了，就永远为 true 了
      .filter(tasks => tasks.filter(task => task.taskListId === this.list.id).length > 0);
  }

  ngOnDestroy(){
    if(this.userSub) this.userSub.unsubscribe();
  }

  onChangeListName(){
    
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

  onTaskClick(){
    
  }

  addNewTask(ev: Event){
    ev.preventDefault();
    this.dialog.open(NewTaskComponent, {data:{
      taskListId: this.list.id,
      user: this.user
    }});
  }
}
