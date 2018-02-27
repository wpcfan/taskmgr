import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, take, filter, withLatestFrom, switchMap } from 'rxjs/operators';
import { Task, TaskList } from '../../../domain';
import { NewTaskListComponent } from '../../components/new-task-list';
import { NewTaskComponent } from '../../components/new-task';
import { CopyTaskComponent } from '../../components/copy-task';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog';
import { defaultRouteAnim, listAnimation } from '../../../anim';
import { TaskListVM, TaskVM } from '../../../vm';
import * as fromRoot from '../../../reducers';
import * as listActions from '../../../actions/task-list.action';
import * as taskActions from '../../../actions/task.action';
import * as TaskHistoryActions from '../../../actions/task-history.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [defaultRouteAnim, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent {

  @HostBinding('@routeAnim') state: string;
  lists$: Observable<TaskListVM[]>;
  private projectId$: Observable<string>;
  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private store$: Store<fromRoot.State>) {
    this.projectId$ = this.route.paramMap.pipe(map(p => <string>p.get('id')));
    this.lists$ = this.store$.pipe(select(fromRoot.getTaskByFilter));
  }

  handleRenameList(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { name: list.name } });
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(n => n)
      ).subscribe(name => {
        this.store$.dispatch(new listActions.UpdateTaskListAction({ ...list, name: name }));
      });
  }

  handleNewTaskList(ev: Event) {
    ev.preventDefault();
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: {} });
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(n => n),
        withLatestFrom(this.store$.select(fromRoot.getTaskListTotal), (_n, _o) => ({ name: _n, order: _o })),
        withLatestFrom(this.projectId$, (val, projectId) => ({ ...val, projectId: projectId }))
      )
      .subscribe(({ name, order, projectId }) => {
        this.store$.dispatch(new listActions.AddTaskListAction({ id: undefined, name: name, order: order + 1, projectId: projectId }));
      });
  }

  handleMoveList(listId: string) {
    const list$ = this.store$.pipe(
      select(fromRoot.getProjectTaskList),
      map(lists => lists.filter((list: TaskList) => list.id !== listId))
    );
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: { srcListId: listId, lists: list$ } });
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(n => n)
      ).subscribe(val => {
        this.store$.dispatch(new taskActions.MoveAllAction(val));
      });
  }

  handleDelList(list: TaskList) {
    const confirm = {
      title: '删除项目：',
      content: '确认要删除该任务列表？',
      confirmAction: '确认删除'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { dialog: confirm } });

    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef.afterClosed()
      .pipe(
        take(1)
      )
      .subscribe(val => {
        if (val) {
          this.store$.dispatch(new listActions.DeleteTaskListAction(list));
        }
      });
  }

  handleCompleteTask(task: Task) {
    this.store$.dispatch(new taskActions.CompleteTaskAction(task));
  }

  handleMove(srcData: { tag: string; data: any }, taskList: TaskList) {
    switch (srcData.tag) {
      case 'task-item': {
        this.store$.dispatch(new taskActions.MoveTaskAction({ taskId: <string>srcData.data.id, taskListId: <string>taskList.id }));
        break;
      }
      case 'task-list': {
        this.store$.dispatch(new listActions.SwapOrderAction({ src: <TaskList>srcData.data, target: <TaskList>taskList }));
        break;
      }
      default:
        break;
    }
  }

  handleAddTask(listId: string) {
    const user$ = this.store$.pipe(select(fromRoot.getAuthUser));
    user$
      .pipe(
        take(1),
        map(user => this.dialog.open(NewTaskComponent, { data: { owner: user } })),
        switchMap(dialogRef => dialogRef.afterClosed()
          .pipe(
            take(1),
            filter(n => n)
          ))
      )
      .subscribe(val => {
        this.store$.dispatch(new taskActions.AddTaskAction({
          ...val.task,
          taskListId: listId,
          completed: false,
          createDate: new Date()
        }));
      });
  }

  handleUpdateTask(task: TaskVM) {
    this.store$.dispatch(new taskActions.SelectTaskAction(task));

    const dialogRef = this.dialog.open(NewTaskComponent, { data: { task: task } });
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(n => n)
      )
      .subscribe((val) => {
        if (val.type !== 'delete') {
          this.store$.dispatch(new taskActions.UpdateTaskAction({ ...task, ...val.task }));
        } else {
          this.store$.dispatch(new taskActions.DeleteTaskAction(val.task));
        }
      });
  }

  handleQuickTask(desc: string, listId: string) {
    const user$ = this.store$.pipe(select(fromRoot.getAuthUser));
    user$.pipe(take(1)).subscribe(user => {
      this.store$.dispatch(new taskActions.AddTaskAction({
        id: undefined,
        desc: desc,
        priority: 3,
        ownerId: <string>user.id,
        participantIds: [],
        taskListId: listId,
        completed: false,
        createDate: new Date()
      }));
    });
  }
}
