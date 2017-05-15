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
import { TaskService } from '../services';
import * as actions from '../actions/task.action';
import * as fromRoot from '../reducers';
import * as models from '../domain';

@Injectable()
export class TaskEffects{
  /**
   * 任务的 Effects
   * @param actions$ 注入 action 数据流
   * @param service 注入任务服务
   * @param store$ 注入 redux store 
   */
  constructor(
    private actions$: Actions, 
    private service$: TaskService,
    private store$: Store<fromRoot.State>) { }
  /**
   * 
   */
  @Effect()
  loadTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .debounceTime(300) //TODO: remove this when used in production
    .switchMap((taskListId) => this.service$
      .get(taskListId)
      .map(tasks => new actions.LoadTasksSuccessAction(tasks))
      .catch(err => of(new actions.LoadTasksFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .switchMap((task) => {
      return this.service$
        .add(task)
        .map(task => new actions.AddTaskSuccessAction(task))
        .catch(err => of(new actions.AddTaskFailAction(JSON.stringify(err))))
      }
    );

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(task => this.service$
      .update(task)
      .map(task => new actions.UpdateTaskSuccessAction(task))
      .catch(err => of(new actions.UpdateTaskFailAction(JSON.stringify(err))))
    );
  
  @Effect()
  removeTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(task => this.service$
      .delete(task)
      .map(task => new actions.DeleteTaskSuccessAction(task))
      .catch(err => of(new actions.DeleteTaskFailAction(JSON.stringify(err))))
    );

}