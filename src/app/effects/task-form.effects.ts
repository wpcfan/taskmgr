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
import { TaskFormService } from "../services/task-form.service";
import * as actions from '../actions/task-form.action';
import * as fromRoot from '../reducers';
import { Task, TaskList, User } from '../domain';
import { NewTaskComponent } from '../task/new-task';

@Injectable()
export class TaskFormEffects{
  /**
   * 任务表单对话框的 Effects
   * @param actions$ 注入 action 数据流
   * @param service 注入任务服务
   * @param store$ 注入 redux store 
   */
  constructor(
    private actions$: Actions, 
    private service$: TaskFormService,
    private store$: Store<fromRoot.State>) { }
  /**
   * 
   */
  @Effect()
  launchAdd$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.PREPARE_ADD)
    .map(toPayload)
    .mergeMap((taskListId:string) => {
      return this.service$.prepareAddTask(taskListId)
        .map(data => new actions.PrepareAddSuccessAction(data))
        .catch(err => of(new actions.PrepareAddFailAction(JSON.stringify(err))))
      }
    );

  @Effect()
  launchUpdate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.PREPARE_UPDATE)
    .map(toPayload)
    .mergeMap((task) => {
      const final$ = this.service$.prepareUpdateTask(task);
      return final$.map(data => new actions.PrepareUpdateSuccessAction(data))
        .catch(err => of(new actions.PrepareUpdateFailAction(JSON.stringify(err))))
      }
    );

}