import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {TaskListService} from '../services';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';
import * as taskActions from '../actions/task.action';
import * as fromRoot from '../reducers';
import {Task, TaskList} from '../domain';

@Injectable()
export class TaskListEffects {
  /**
   *
   */
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType<actions.LoadTaskListsAction>(actions.LOADS)
    .map(action => action.payload)
    .switchMap((projectId) => this.service$
      .get(projectId)
      .map(taskLists => new actions.LoadTaskListsSuccessAction(taskLists))
      .catch(err => of(new actions.LoadTaskListsFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .ofType<actions.AddTaskListAction>(actions.ADD)
    .map(action => action.payload)
    .switchMap((taskList) => {
      return this.service$
        .add(taskList)
        .map(tl => new actions.AddTaskListSuccessAction(tl))
        .catch(err => of(new actions.AddTaskListFailAction(JSON.stringify(err))));
      }
    );

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$
    .ofType<actions.UpdateTaskListAction>(actions.UPDATE)
    .map(action => action.payload)
    .switchMap(taskList => this.service$
      .update(taskList)
      .map(tl => new actions.UpdateTaskListSuccessAction(tl))
      .catch(err => of(new actions.UpdateTaskListFailAction(JSON.stringify(err))))
    );

  @Effect()
  removeTaskList$: Observable<Action> = this.actions$
    .ofType<actions.DeleteTaskListAction>(actions.DELETE)
    .map(action => action.payload)
    .switchMap(taskList => this.service$
      .del(taskList)
      .map(tl => new actions.DeleteTaskListSuccessAction(tl))
      .catch(err => of(new actions.DeleteTaskListFailAction(JSON.stringify(err))))
    );

  @Effect()
  removeTasksInList$: Observable<Action> = this.actions$
    .ofType<actions.DeleteTaskListSuccessAction>(actions.DELETE_SUCCESS)
    .map(action => action.payload)
    .switchMap((taskList: TaskList) => {
      return this.store$.select(fromRoot.getTasks)
        .switchMap((tasks: Task[]) =>
          Observable.from(tasks.filter(t => t.taskListId === taskList.id)))
        .map(task => new taskActions.DeleteTaskAction(task));
    });

  @Effect()
  swapOrder$: Observable<Action> = this.actions$
    .ofType<actions.SwapOrderAction>(actions.SWAP_ORDER)
    .map(action => action.payload)
    .switchMap(({src, target}) =>
      this.service$.swapOrder(src, target)
        .map(tls => new actions.SwapOrderSuccessAction(tls))
        .catch(err => of(new actions.SwapOrderFailAction(err)))
    );

  @Effect()
  loadTasksInList$: Observable<Action> = this.actions$
    .ofType<actions.LoadTaskListsSuccessAction>(actions.LOADS_SUCCESS)
    .map(action => action.payload)
    .map(lists => new taskActions.LoadTasksInListsAction(lists));

  /**
   * 任务列表的 Effects
   * @param actions$ 注入 action 数据流
   * @param service$ 注入任务列表服务
   * @param store$ 注入 redux store
   */
  constructor(private actions$: Actions,
              private service$: TaskListService,
              private store$: Store<fromRoot.State>) {
  }
}
