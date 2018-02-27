import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { TaskService } from '../services';
import { Task } from '../domain';
import * as actions from '../actions/task.action';
import * as taskHistoryActions from '../actions/task-history.action';

@Injectable()
export class TaskEffects {

  @Effect()
  loadTasksInLists$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadTasksInListsAction>(actions.LOAD_IN_LISTS),
      map(action => action.payload),
      mergeMap((taskLists) => this.service$.getByLists(taskLists)
        .pipe(
          map(tasks => new actions.LoadTasksInListsSuccessAction(tasks)),
          catchError(err => of(new actions.LoadTasksInListsFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  addTask$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.AddTaskAction>(actions.ADD),
      map(action => action.payload),
      switchMap((task) => this.service$.add(task)
        .pipe(
          map(t => new actions.AddTaskSuccessAction(t)),
          catchError(err => of(new actions.AddTaskFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  updateTask$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.UpdateTaskAction>(actions.UPDATE),
      map(action => action.payload),
      switchMap(task => this.service$.update(task)
        .pipe(
          map(t => new actions.UpdateTaskSuccessAction(t)),
          catchError(err => of(new actions.UpdateTaskFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  removeTask$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.DeleteTaskAction>(actions.DELETE),
      map(action => action.payload),
      switchMap(task => this.service$.del(task)
        .pipe(
          map(t => new actions.DeleteTaskSuccessAction(t)),
          catchError(err => of(new actions.DeleteTaskFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  completeTask$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.CompleteTaskAction>(actions.COMPLETE),
      map(action => action.payload),
      switchMap(task => this.service$.complete(task)
        .pipe(
          map(t => new actions.CompleteTaskSuccessAction(t)),
          catchError(err => of(new actions.CompleteTaskFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  moveTask$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.MoveTaskAction>(actions.MOVE),
      map(action => action.payload),
      switchMap(({ taskId, taskListId }) => this.service$.move(taskId, taskListId)
        .pipe(
          map(task => new actions.MoveTaskSuccessAction(task)),
          catchError(err => of(new actions.MoveTaskFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  moveAllTask$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.MoveAllAction>(actions.MOVE_ALL),
      map(action => action.payload),
      switchMap(({ srcListId, targetListId }) => this.service$.moveAll(srcListId, targetListId)
        .pipe(
          map(tasks => new actions.MoveAllSuccessAction(tasks)),
          catchError(err => of(new actions.MoveAllFailAction(err)))
        )
      )
    );

  /**
   * 任务的 Effects
   * @param actions$ 注入 action 数据流
   * @param service$ 注入任务服务
   * @param store$ 注入 redux store
   */
  constructor(private actions$: Actions,
    private service$: TaskService) { }
}
