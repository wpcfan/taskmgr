import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { ProjectService } from '../services/project.service';
import * as actions from '../actions/project.action';
import * as fromRoot from '../reducers';
import * as entities from '../domain';

@Injectable()
export class ProjectEffects{
  /**
   * 
   * @param actions$ 
   * @param todoService 
   */
  constructor(
    private actions$: Actions, 
    private service: ProjectService,
    private store$: Store<fromRoot.State>) { }
  /**
   * 
   */
  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD_PROJECTS)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([_, auth]) => this.service.get(auth.user.id))
    .map(projects => new actions.LoadProjectsSuccessAction(projects))
    .catch(err => of(new actions.LoadProjectsFailAction(err.json())));

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_PROJECT)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([project, auth]) => {
      const added = Object.assign({}, project, {memberIds: [auth.user.id]})
      return this.service.add(added);
    })
    .map(project => new actions.AddProjectSuccessAction(project))
    .catch(err => of(new actions.AddProjectFailAction(err.json())));

  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE_PROJECT)
    .map(toPayload)
    .switchMap(project => this.service.update(project))
    .map(project => new actions.UpdateProjectSuccessAction(project))
    .catch(err => of(new actions.UpdateProjectFailAction(err.json())));
  
  @Effect()
  removeProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE_PROJECT)
    .map(toPayload)
    .switchMap(project => this.service.delete(project))
    .map(project => new actions.DeleteProjectSuccessAction(project))
    .catch(err => of(new actions.DeleteProjectFailAction(err.json())));
  
}