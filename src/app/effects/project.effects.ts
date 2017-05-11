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
import { ProjectService, TaskListService } from '../services';
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
    private taskService: TaskListService,
    private store$: Store<fromRoot.State>) { }
  /**
   * 
   */
  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOADS)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([_, auth]) => this.service
      .get(auth.user.id)
      .map(projects => new actions.LoadProjectsSuccessAction(projects))
      .catch(err => of(new actions.LoadProjectsFailAction(JSON.stringify(err))))
    );

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([project, auth]) => {
      const added = Object.assign({}, project, {members: [`${auth.user.id}`]});
      return this.service
        .add(added)
        .switchMap(prj => {
          const id = prj.id;
          return concat(
            this.taskService.add('待办', id), 
            this.taskService.add('进行中', id),
            this.taskService.add('已完成', id))
            .reduce((r,x)=> {
              return [...r, x];
            },[])
            .map(tls => Object.assign({}, prj, {taskLists: tls.map(tl=>tl.id)}))
            .switchMap(prj => this.service.update(prj))
        })
        .map(project => new actions.AddProjectSuccessAction(project))
        .catch(err => of(new actions.AddProjectFailAction(JSON.stringify(err))))
      }
    );

  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(project => this.service
      .update(project)
      .map(project => new actions.UpdateProjectSuccessAction(project))
      .catch(err => of(new actions.UpdateProjectFailAction(JSON.stringify(err))))
    );
  
  @Effect()
  removeProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(project => this.service
      .delete(project)
      .map(project => new actions.DeleteProjectSuccessAction(project))
      .catch(err => of(new actions.DeleteProjectFailAction(JSON.stringify(err))))
    );
  
}