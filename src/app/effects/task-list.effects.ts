import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/zip';
import { TaskListService } from '../services';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import * as fromRoot from '../reducers';
import * as models from '../domain';

@Injectable()
export class TaskListEffects{
  /**
   * 任务列表的 Effects
   * @param actions$ 注入 action 数据流
   * @param service 注入任务列表服务
   * @param store$ 注入 redux store 
   */
  constructor(
    private actions$: Actions, 
    private service$: TaskListService,
    private store$: Store<fromRoot.State>) { }
  /**
   * 
   */
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOADS)
    .map(toPayload)
    .switchMap((projectId) => this.service$
      .get(projectId)
      .map(taskLists => new actions.LoadTaskListsSuccessAction(taskLists))
      .catch(err => of(new actions.LoadTaskListsFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .switchMap((taskList) => {
      return this.service$
        .add(taskList)
        .map(taskList => new actions.AddTaskListSuccessAction(taskList))
        .catch(err => of(new actions.AddTaskListFailAction(JSON.stringify(err))))
      }
    );

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(taskList => this.service$
      .update(taskList)
      .map(taskList => new actions.UpdateTaskListSuccessAction(taskList))
      .catch(err => of(new actions.UpdateTaskListFailAction(JSON.stringify(err))))
    );
  
  @Effect()
  removeTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(taskList => this.service$
      .delete(taskList)
      .map(taskList => new actions.DeleteTaskListSuccessAction(taskList))
      .catch(err => of(new actions.DeleteTaskListFailAction(JSON.stringify(err))))
    );

  @Effect()
  initializeTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INITIALIZE)
    .map(toPayload)
    .switchMap(prj => {
      return this.service$.initializeTaskLists(prj)
        .map(project => new actions.InitTaskListsSuccessAction(project))
        .catch(err => of(new actions.InitTaskListsFailAction(JSON.stringify(err))))
    })
  
  @Effect()
  updateProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INITIALIZE_SUCCESS)
    .map(toPayload)
    .map(prj => new prjActions.UpdateProjectAction(prj));

  // @Effect()
  // dragDrop$: Observable<Action> = this.actions$
  //   .ofType(actions.ActionTypes.DROP)
  //   .switchMap(_ => {
  //     const drag$ = this.store$.select(fromRoot.getTaskDrag);
  //     const drop$ = this.store$.select(fromRoot.getTaskDrop);
  //     return Observable.zip(drag$, drop$, (_drag, _drop) => {
  //       return this.service$.swapOrder(_drag, _drop);
  //     })
  //     .map(_ => new actions.SwapOrderSuccessAction(true))
  //     .catch(err => of(new actions.SwapOrderFailAction(JSON.stringify(err))))
  //   })

  @Effect()
  dragDrop$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DROP)
    .switchMap(_ => this.store$.select(fromRoot.getTaskDrag))
    .switchMap(drag => this.service$.update(drag)
      .map(_ => new actions.SwapOrderSuccessAction(true))
      .catch(err => of(new actions.SwapOrderFailAction(JSON.stringify(err)))))
    .switchMap(_ => this.store$.select(fromRoot.getTaskDrop))
    .switchMap(drop => this.service$.update(drop)
      .map(_ => new actions.SwapOrderSuccessAction(true))
      .catch(err => of(new actions.SwapOrderFailAction(JSON.stringify(err)))))
}