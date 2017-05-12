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
import { TaskListService } from '../services';
import * as actions from '../actions/task-list.action';
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
    .withLatestFrom(this.store$.select(fromRoot.getSelectedProjectId))
    .switchMap(([_, projectId]) => this.service$
      .get(projectId)
      .map(taskLists => new actions.LoadTaskListsSuccessAction(taskLists))
      .catch(err => of(new actions.LoadTaskListsFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getSelectedProjectId))
    .switchMap(([taskList, projectId]) => {
      return this.service$
        .add(taskList, projectId)
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
  navigateToTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOADS_SUCCESS)
    .map(() => go(['/tasklists']));
}