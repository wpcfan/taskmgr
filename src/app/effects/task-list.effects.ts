import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { TaskListService } from '../services';
import { Task, TaskList } from '../domain';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import * as taskActions from '../actions/task.action';
import * as fromRoot from '../reducers';

@Injectable()
export class TaskListEffects {
  /**
   *
   */
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadTaskListsAction>(actions.LOADS),
      map(action => action.payload),
      switchMap((projectId) => this.service$.get(projectId)
        .pipe(
          map(taskLists => new actions.LoadTaskListsSuccessAction(taskLists)),
          catchError(err => of(new actions.LoadTaskListsFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.AddTaskListAction>(actions.ADD),
      map(action => action.payload),
      switchMap((taskList) => this.service$.add(taskList)
        .pipe(
          map(tl => new actions.AddTaskListSuccessAction(tl)),
          catchError(err => of(new actions.AddTaskListFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.UpdateTaskListAction>(actions.UPDATE),
      map(action => action.payload),
      switchMap(taskList => this.service$.update(taskList)
        .pipe(
          map(tl => new actions.UpdateTaskListSuccessAction(tl)),
          catchError(err => of(new actions.UpdateTaskListFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  removeTaskList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.DeleteTaskListAction>(actions.DELETE),
      map(action => action.payload),
      switchMap(taskList => this.service$.del(taskList)
        .pipe(
          map(tl => new actions.DeleteTaskListSuccessAction(tl)),
          catchError(err => of(new actions.DeleteTaskListFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  removeTasksInList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.DeleteTaskListSuccessAction>(actions.DELETE_SUCCESS),
      map(action => action.payload),
      switchMap((taskList: TaskList) => this.store$
        .pipe(
          select(fromRoot.getTasks),
          switchMap((tasks: Task[]) => from(tasks.filter(t => t.taskListId === taskList.id))),
          map(task => new taskActions.DeleteTaskAction(task)))
        )
    );

  @Effect()
  initializeTaskLists$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.InitTaskListsAction>(actions.INITIALIZE),
      map(action => action.payload),
      switchMap(prj => this.service$.initializeTaskLists(prj)
        .pipe(
          map(project => new actions.InitTaskListsSuccessAction(project)),
          catchError(err => of(new actions.InitTaskListsFailAction(JSON.stringify(err)))))
        )
    );

  @Effect()
  updateProjectRef$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.InitTaskListsSuccessAction>(actions.INITIALIZE_SUCCESS),
      map(action => action.payload),
      map(prj => new prjActions.UpdateListsAction(prj))
    );

  @Effect()
  swapOrder$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.SwapOrderAction>(actions.SWAP_ORDER),
      map(action => action.payload),
      switchMap(({ src, target }) =>
        this.service$.swapOrder(src, target)
          .pipe(
            map(tls => new actions.SwapOrderSuccessAction(tls)),
            catchError(err => of(new actions.SwapOrderFailAction(err)))
          )
      )
    );

  @Effect()
  loadTasksInList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadTaskListsSuccessAction>(actions.LOADS_SUCCESS),
      map(action => action.payload),
      map(lists => new taskActions.LoadTasksInListsAction(lists))
    );

  /**
   * 任务列表的 Effects
   * @param actions$ 注入 action 数据流
   * @param service$ 注入任务列表服务
   * @param store$ 注入 redux store
   */
  constructor(private actions$: Actions,
    private service$: TaskListService,
    private store$: Store<fromRoot.State>) {
  }
}
