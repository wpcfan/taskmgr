import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { TaskFilterService } from '../services';
import { TaskFilter, Project } from '../domain';
import { TaskFilterVM } from '../vm';
import {
  getToAddTaskFilter,
  getToUpdateTaskFilter
} from '../utils/task-filter.util';
import * as actions from '../actions/task-filter.action';
import * as taskFilterVMActions from '../actions/task-filter-vm.action';
import * as projectActions from '../actions/project.action';
import * as fromRoot from '../reducers';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';

@Injectable()
export class TaskFilterEffects {
  @Effect()
  loadTaskFilter$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadTaskFilterAction>(actions.LOAD),
    map(action => action.payload),
    switchMap((taskFilterId: string) =>
      this.service$.getTaskFilter(taskFilterId).pipe(
        map(
          (taskFilter: TaskFilter) =>
            new actions.LoadTaskFilterSuccessAction(taskFilter)
        ),
        catchError(err =>
          of(new actions.LoadTaskFilterFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  @Effect()
  loadTaskFilterOwners$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadTaskFilterSuccessAction>(actions.LOAD_SUCCESS),
    map(action => action.payload),
    map(
      taskFilter =>
        new taskFilterVMActions.LoadTaskFilterOwnersAction(taskFilter)
    )
  );

  @Effect()
  addTaskFilter$: Observable<Action> = this.actions$.pipe(
    ofType<actions.AddTaskFilterAction>(actions.ADD),
    map(action => action.payload),
    switchMap((project: Project) =>
      this.service$.addTaskFilter(getToAddTaskFilter(<string>project.id)).pipe(
        map(
          (taskFilter: TaskFilter) =>
            new actions.AddTaskFilterSuccessAction({
              ...project,
              taskFilterId: taskFilter.id
            })
        ),
        catchError(err =>
          of(new actions.AddTaskFilterFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  @Effect()
  insertTaskFilterId$: Observable<Action> = this.actions$.pipe(
    ofType<actions.AddTaskFilterSuccessAction>(actions.ADD_SUCCESS),
    map(action => action.payload),
    map(project => new projectActions.InsertFilterAction(project))
  );

  @Effect()
  updateTaskFilter$: Observable<Action> = this.actions$.pipe(
    ofType<actions.UpdateTaskFilterAction>(actions.UPDATE),
    map(action => action.payload),
    withLatestFrom(this.store$.pipe(select(fromRoot.getTaskFilterState))),
    mergeMap(([taskFilterVM, taskFilter]: [TaskFilterVM, TaskFilter]) => {
      return this.service$
        .updateTaskFilter(getToUpdateTaskFilter(taskFilter, taskFilterVM))
        .pipe(
          map(
            (tf: TaskFilter) => new actions.UpdateTaskFilterSuccessAction(tf)
          ),
          catchError(err =>
            of(new actions.UpdateTaskFilterFailAction(JSON.stringify(err)))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: TaskFilterService,
    private store$: Store<fromRoot.State>
  ) {}
}
