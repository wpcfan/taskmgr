import { 
  Component, 
  Renderer2,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/count';
import 'rxjs/add/observable/combineLatest';
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
  dragged;
  loading: boolean = true;
  lists$: Observable<TaskList[]>;
  private drag$: Observable<TaskList>;
  private drop$: Observable<TaskList>;
  private routeParamSub: Subscription;
  private listSub: Subscription;
  private projectId: string;
  private count: number;
  constructor(
    private renderer: Renderer2, 
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private store$: Store<fromRoot.State>) {
      // const routeParam$ = this.route.params.pluck('id');
      // this.routeParamSub = routeParam$.subscribe(
      //   (id:string) => {
      //     this.store$.dispatch(new actions.LoadTaskListsAction(id));
      //     this.projectId = id;
      //   });
      this.lists$ = this.store$.select(fromRoot.getProjectTaskList);
      this.drag$ = this.store$.select(fromRoot.getTaskDrag);
      this.drop$ = this.store$.select(fromRoot.getTaskDrop);
      this.listSub = this.store$.select(fromRoot.getTaskLists)
        .subscribe(lists => this.count = lists.length);
  }

  ngOnDestroy(){
    // 取消订阅以免内存泄露
    if(this.routeParamSub)
      this.routeParamSub.unsubscribe();
    if(this.listSub)
      this.listSub.unsubscribe();
  }

  onDragStart(e, src){
    this.store$.dispatch(new actions.DragAction(src.id));
    this.dragged = event.target;
    e.target.style.opacity=.5;
    e.target.style.border = "#ff525b dashed 2px"
  }
  onDragEnd(e){
    e.target.style.opacity=1;
    e.target.style.background = "#EEEEEE";
    e.target.style.border = "";
  }
  onDragOver(e){
    e.preventDefault();
  }
  onDrop(e, target){
    // prevent default action
    e.preventDefault();
    
    // move dragged elem to the selected drop target
    if (e.target.className == "list-container") {
      this.store$.dispatch(new actions.DropAction(target.id));
      e.target.style.background = "#EEEEEE";
    }
  }
  onDragEnter(e){
    // highlight potential drop target when the draggable element enters it
    if (e.target.className == "list-container" ) {
      e.target.style.background = "purple";
    }
  }
  onDragLeave(e){
    // reset background of potential drop target when the draggable element leaves it
    if (e.target.className == "list-container" ) {
      e.target.style.background = "#EEEEEE";
    }
  }
  openNewTaskList(ev: Event){
    ev.preventDefault();
    this.dialog.open(NewTaskListComponent, {data:{
      taskList: {
        projectId: this.projectId,
        order: this.count+1
      }
    }});
  }
}
