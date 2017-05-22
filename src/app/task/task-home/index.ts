import { 
  Component, 
  Renderer2,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs/Subscription";
import * as fromRoot from "../../reducers";
import * as actions from '../../actions/task-list.action';
import { TaskList } from '../../domain';
import { NewTaskListComponent } from "../new-task-list";

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnDestroy{
  loading$: Observable<boolean>;
  lists$: Observable<TaskList[]>;
  private routeParamSub: Subscription;
  private projectId: string;
  constructor(
    private renderer: Renderer2, 
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private store$: Store<fromRoot.State>) {
      const routeParam$ = this.route.params.pluck('id');
      this.routeParamSub = routeParam$.subscribe(
        (id:string) => {
          this.projectId = id;
        });
      this.lists$ = this.store$.select(fromRoot.getProjectTaskList);
      this.loading$ = this.store$.select(fromRoot.getTaskLoading);
  }

  ngOnDestroy(){
    // 取消订阅以免内存泄露
    if(this.routeParamSub)
      this.routeParamSub.unsubscribe();
  }

  handleRenameList(list: TaskList){
    this.dialog.open(NewTaskListComponent, {data: {
      taskList: Object.assign({}, list)
    }})
  }

  handleNewTaskList(ev: Event){
    ev.preventDefault();
    this.dialog.open(NewTaskListComponent, {data:{
      taskList: {
        projectId: this.projectId
      }
    }});
  }

  handleMoveList(listId: string){

  }

  handleCopyList(listId: string){

  }

  handleDelList(listId: string){

  }

  handleMoveTask(listId: string){

  }

  handleCompleteTask(listId: string){

  }

  tasksByList(listId:string){
    return this.store$
      .select(fromRoot.getTasksWithOwner)
      .map(tasks => tasks.filter(task => task.taskListId === listId));
  }
}
