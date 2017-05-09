import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { ProjectService } from '../services';
import * as actions from '../actions/project.action';
import * as fromRoot from '../reducers';
import * as models from '../domain';

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
    .switchMap(([_, auth]) => this.service
      .get(auth.user.id)
      .map(projects => new actions.LoadProjectsSuccessAction(projects))
      .catch(err => of(new actions.LoadProjectsFailAction(JSON.stringify(err)))));

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_PROJECT)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([project, auth]) => {
      const added = Object.assign({}, project, {members: [`${auth.user.id}`]});
      return this.service
        .add(added)
        .catch(err => of(new actions.AddProjectFailAction(JSON.stringify(err))).mapTo(undefined));
    })
    .filter(p => p !== undefined)
    .map(project => new actions.AddProjectSuccessAction(project));

  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE_PROJECT)
    .map(toPayload)
    .switchMap(project => this.service
      .update(project)
      .catch(err => of(new actions.UpdateProjectFailAction(JSON.stringify(err))).mapTo(undefined)))
    .filter(p => p !== undefined)
    .map(project => new actions.UpdateProjectSuccessAction(project));
  
  @Effect()
  removeProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE_PROJECT)
    .map(toPayload)
    .switchMap(project => this.service
      .delete(project)
      .catch(err => of(new actions.DeleteProjectFailAction(JSON.stringify(err))).mapTo(undefined)))
    .filter(p => p !== undefined)
    .map(project => new actions.DeleteProjectSuccessAction(project));
  
}