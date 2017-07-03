import { ChangeDetectionStrategy, Component, OnDestroy, HostBinding } from '@angular/core';
import {MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';
import {Task, TaskList} from '../../domain';
import {NewTaskListComponent} from '../new-task-list';
import {NewTaskComponent} from '../new-task';
import {CopyTaskComponent} from '../copy-task';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog';
import {defaultRouteAnim, listAnimation} from '../../anim';

@Component({
  selector: 'app-task-home',
  template: `
    <div class="task-lists">
      <app-task-list
        class="list-container"
        *ngFor="let taskList of lists$ | async"
        [ngStyle]="{'order': taskList.order}"
        app-droppable
        [dropTags]="['task-item', 'task-list']"
        [dragEnterClass]="'drag-enter'"
        [app-draggable]="true"
        [dragTag]="'task-list'"
        [draggedClass]="'drag-start'"
        [dragData]="taskList"
        (dropped)="handleMove($event, taskList)">
        <app-task-list-header
          [header]="taskList.name"
          (newTask)="handleAddTask(taskList.id)"
          (changeListName)="handleRenameList(taskList)"
          (deleteList)="handleDelList(taskList)"
          (moveAllTasks)="handleMoveList(taskList.id)">
        </app-task-list-header>
        <md-progress-bar color="primary" mode="indeterminate" *ngIf="(loading$ | async) as loading else listItems">
        </md-progress-bar>
        <ng-template #listItems>
          <md-divider></md-divider>
          <app-task-item
            *ngFor="let task of taskList.tasks"
            [item]="task"
            (taskComplete)="handleCompleteTask(task)"
            (taskClick)="handleUpdateTask(task)">
          </app-task-item>
        </ng-template>
      </app-task-list>
    </div>
    <button md-fab (click)="handleNewTaskList($event)" type="button" class="fab-button">
      <md-icon>add</md-icon>
    </button>
  `,
  styles: [`
    .drag-start {
      opacity: 0.5;
      border: #ff525b dashed 2px;
    }
    .drag-enter {
      background-color: dimgray;
    }
    .list-container {
      flex: 0 0 360px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .task-lists {
      min-width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: scroll;
    }
    .fab-button {
      position: fixed;
      right: 32px;
      bottom: 96px;
      z-index: 998;
    }
    :host {
      width: 100%;
      height: 100%;
    }
  `],
  animations: [defaultRouteAnim, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnDestroy {

  @HostBinding('@routeAnim') state;
  loading$: Observable<boolean>;
  lists$: Observable<TaskList[]>;

  private projectId: string;
  private routeParamSub: Subscription;

  constructor(private route: ActivatedRoute,
              private dialog: MdDialog,
              private store$: Store<fromRoot.State>) {
    const routeParam$ = this.route.params.pluck('id');
    this.routeParamSub = routeParam$.subscribe(
      (id: string) => {
        this.projectId = id;
      });
    this.lists$ = this.store$.select(fromRoot.getTasksByList);
  }

  ngOnDestroy() {
    // 取消订阅以免内存泄露
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
  }

  handleRenameList(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { name: list.name }});
    dialogRef.afterClosed().take(1).filter(n => n).subscribe(name => {
      this.store$.dispatch(new listActions.UpdateTaskListAction({...list, name: name}));
    });
  }

  handleNewTaskList(ev: Event) {
    ev.preventDefault();
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { }});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .withLatestFrom(this.store$.select(fromRoot.getMaxListOrder), (_n, _o) => {
        return {
          name: _n,
          order: _o
        }
      })
      .subscribe(({name, order}) => {
        this.store$.dispatch(new listActions.AddTaskListAction({name: name, order: order + 1, projectId: this.projectId}));
      });
  }

  handleMoveList(listId: string) {
    const list$ = this.store$
      .select(fromRoot.getProjectTaskList)
      .map(lists => lists.filter(list => list.id !== listId));
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: { srcListId: listId, lists: list$ }});
    dialogRef.afterClosed().take(1).filter(n => n).subscribe(val => {
      this.store$.dispatch(new taskActions.MoveAllAction(val));
    });
  }

  handleDelList(list: TaskList) {
    const confirm = {
      title: '删除项目：',
      content: '确认要删除该任务列表？',
      confirmAction: '确认删除'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm}});

    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new listActions.DeleteTaskListAction(list));
      }
    });
  }

  handleCompleteTask(task: Task) {
    this.store$.dispatch(new taskActions.CompleteTaskAction(task));
  }

  handleMove(srcData, taskList: TaskList) {
    switch (srcData.tag) {
      case 'task-item': {
        this.store$.dispatch(new taskActions.MoveTaskAction({taskId: srcData.data.id, taskListId: taskList.id}));
        break;
      }
      case 'task-list': {
        this.store$.dispatch(new listActions.SwapOrderAction({src: srcData.data, target: taskList}));
        break;
      }
      default:
        break;
    }
  }

  handleAddTask(listId: string) {
    const user$ = this.store$.select(fromRoot.getAuthUser);
    let owner;
    user$.take(1).subscribe(user => {
      owner = user;
    });
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { owner }});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(val => {
        this.store$.dispatch(new taskActions.AddTaskAction({
          ...val.task,
          taskListId: listId,
          completed: false,
          createDate: new Date()
        }));
      });
  }

  handleUpdateTask(task: Task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { task: task }});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe((val) => {
        if(val.type !== 'delete') {
          this.store$.dispatch(new taskActions.UpdateTaskAction({...task, ...val.task}));
        } else {
          this.store$.dispatch(new taskActions.DeleteTaskAction(val.task));
        }
      });
  }
}
