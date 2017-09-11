import {Component,  HostBinding, ChangeDetectionStrategy} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';
import {Task, TaskList} from '../../domain';
import {NewTaskListComponent} from '../new-task-list';
import {NewTaskComponent} from '../new-task';
import {CopyTaskComponent} from '../copy-task';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog';
import {defaultRouteAnim, listAnimation} from '../../anim';
import {TaskListVM} from '../../vm/task-list.vm';

@Component({
  selector: 'app-task-home',
  template: `
    <div class="task-lists" fxLayout="row" fxLayoutAlign="start start">
      <app-task-list
        class="list-container"
        fxFlex="0 0 360px"
        *ngFor="let taskList of lists$ | async"
        [ngStyle]="{'order': taskList.order}"
        appDroppable
        [dropTags]="['task-item', 'task-list']"
        [dragEnterClass]="'drag-enter'"
        [appDraggable]="true"
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
        <app-quick-task (quickTask)="handleQuickTask($event, taskList.id)"></app-quick-task>
        <app-task-item
          *ngFor="let task of taskList.tasks"
          [item]="task"
          (taskComplete)="handleCompleteTask(task)"
          (taskClick)="handleUpdateTask(task)">
        </app-task-item>
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
      min-height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .task-lists {
      min-width: 100%;
      min-height: 100%;
      overflow-x: scroll;
    }
    .fab-button {
      position: fixed;
      right: 32px;
      bottom: 96px;
      z-index: 998;
    }
    :host {
      display: flex;
      flex: 1
    }
  `],
  animations: [defaultRouteAnim, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent {

  @HostBinding('@routeAnim') state;
  lists$: Observable<TaskListVM[]>;
  private projectId$: Observable<string>;
  constructor(private route: ActivatedRoute,
              private dialog: MdDialog,
              private store$: Store<fromRoot.State>) {
    this.projectId$ = this.route.paramMap.map(p => <string>p.get('id'));
    this.lists$ = this.store$.select(fromRoot.getTasksByList);
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
      .withLatestFrom(this.store$.select(fromRoot.getMaxListOrder), (_n, _o) => ({name: _n, order: _o}))
      .withLatestFrom(this.projectId$, (val, projectId) => ({...val, projectId: projectId}))
      .subscribe(({name, order, projectId}) => {
        this.store$.dispatch(new listActions.AddTaskListAction({name: name, order: order + 1, projectId: projectId}));
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

  handleCompleteTask(task) {
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
    user$
      .take(1)
      .map(user => this.dialog.open(NewTaskComponent, { data: { owner: user }}))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
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
        if (val.type !== 'delete') {
          this.store$.dispatch(new taskActions.UpdateTaskAction({...task, ...val.task}));
        } else {
          this.store$.dispatch(new taskActions.DeleteTaskAction(val.task));
        }
      });
  }

  handleQuickTask(desc: string, listId: string) {
    const user$ = this.store$.select(fromRoot.getAuthUser);
    user$.take(1).subscribe(user => {
      this.store$.dispatch(new taskActions.AddTaskAction({
        desc: desc,
        priority: 3,
        remark: null,
        ownerId: user.id,
        participantIds: [],
        taskListId: listId,
        completed: false,
        createDate: new Date()
      }));
    })
  }
}
