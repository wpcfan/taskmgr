import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskFilterService } from '../services';
import { TaskFilter, Project } from '../domain';
import { TaskFilterVM } from '../vm';
import { getToAddTaskFilter, getToUpdateTaskFilter } from '../utils/task-filter.util';
import * as actions from '../actions/task-filter.action';
import * as taskFilterVMActions from '../actions/task-filter-vm.action';
import * as projectActions from '../actions/project.action';
import * as fromRoot from '../reducers';

@Injectable()
export class TaskFilterEffects {

  constructor(private actions$: Actions,
    private service$: TaskFilterService,
    private store$: Store<fromRoot.State>) {
  }

  @Effect()
  loadTaskFilter$: Observable<Action> = this.actions$
    .ofType<actions.LoadTaskFilterAction>(actions.LOAD)
    .map(action => action.payload)
    .switchMap((taskFilterId: string) => this.service$
      .getTaskFilter(taskFilterId)
      .map((taskFilter: TaskFilter) => new actions.LoadTaskFilterSuccessAction(taskFilter))
      .catch(err => of(new actions.LoadTaskFilterFailAction(JSON.stringify(err))))
    );

  @Effect()
  loadTaskFilterOwners$: Observable<Action> = this.actions$
    .ofType<actions.LoadTaskFilterSuccessAction>(actions.LOAD_SUCCESS)
    .map(action => action.payload)
    .map(taskFilter => new taskFilterVMActions.LoadTaskFilterOwnersAction(taskFilter));

  @Effect()
  addTaskFilter$: Observable<Action> = this.actions$
    .ofType<actions.AddTaskFilterAction>(actions.ADD)
    .map(action => action.payload)
    .switchMap((project: Project) => this.service$
      .addTaskFilter(getToAddTaskFilter(<string>project.id))
      .map((taskFilter: TaskFilter) => new actions.AddTaskFilterSuccessAction({ ...project, taskFilterId: taskFilter.id }))
      .catch(err => of(new actions.AddTaskFilterFailAction(JSON.stringify(err))))
    );

  @Effect()
  insertTaskFilterId$: Observable<Action> = this.actions$
    .ofType<actions.AddTaskFilterSuccessAction>(actions.ADD_SUCCESS)
    .map(action => action.payload)
    .map(project => new projectActions.InsertFilterAction(project));

  @Effect()
  updateTaskFilter$: Observable<Action> = this.actions$
    .ofType<actions.UpdateTaskFilterAction>(actions.UPDATE)
    .map(action => action.payload)
    .withLatestFrom(this.store$.select(fromRoot.getTaskFilterState))
    .mergeMap(([taskFilterVM, taskFilter]: [TaskFilterVM, TaskFilter]) => {
      return this.service$.updateTaskFilter(getToUpdateTaskFilter(taskFilter, taskFilterVM))
        .map((taskFilter: TaskFilter) => new actions.UpdateTaskFilterSuccessAction(taskFilter))
        .catch(err => of(new actions.UpdateTaskFilterFailAction(JSON.stringify(err))))
    });
}


