import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';
import {Task, TaskList} from '../../domain';
import {NewTaskListComponent} from '../new-task-list';
import {NewTaskComponent} from '../new-task';
import {CopyTaskComponent} from '../copy-task';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/index';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnDestroy {

  loading$: Observable<boolean>;
  lists$: Observable<TaskList[]>;

  private darkTheme: boolean;
  private projectId: string;
  private routeParamSub: Subscription;
  private subTheme: Subscription;
  private subTasks: Subscription;

  constructor(private route: ActivatedRoute,
              private dialog: MdDialog,
              private store$: Store<fromRoot.State>) {
    const routeParam$ = this.route.params.pluck('id');
    this.routeParamSub = routeParam$.subscribe(
      (id: string) => {
        this.projectId = id;
      });
    this.subTheme = this.store$.select(fromRoot.getTheme)
      .subscribe(result => {
        this.darkTheme = result;
      });
    this.lists$ = this.store$.select(fromRoot.getProjectTaskList);
    this.subTasks = this.lists$.subscribe(lists => {
      lists.forEach((list) => {
        this.store$.dispatch(new taskActions.LoadTasksAction(list.id));
      });
    });
    this.loading$ = this.store$.select(fromRoot.getTaskLoading);
  }

  ngOnDestroy() {
    // 取消订阅以免内存泄露
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
    if (this.subTheme) {
      this.subTheme.unsubscribe();
    }
    if (this.subTasks) {
      this.subTasks.unsubscribe();
    }
  }

  tasksByList(listId: string) {
    return this.store$
      .select(fromRoot.getTasksWithOwner)
      .map(tasks => tasks.filter(task => task.taskListId === listId));
  }

  handleRenameList(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { darkTheme: this.darkTheme, name: list.name }});
    dialogRef.afterClosed().take(1).filter(n => n).subscribe(name => {
      this.store$.dispatch(new listActions.UpdateTaskListAction({...list, name: name}));
    });
  }

  handleNewTaskList(ev: Event) {
    ev.preventDefault();
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { darkTheme: this.darkTheme }});
    dialogRef.afterClosed().take(1).filter(n => n).subscribe(name => {
      this.store$.dispatch(new listActions.AddTaskListAction({name: name, order: 0, projectId: this.projectId}));
    });
  }

  handleMoveList(listId: string) {
    const list$ = this.store$
      .select(fromRoot.getProjectTaskList)
      .map(lists => lists.filter(list => list.id !== listId));
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: { darkTheme: this.darkTheme, srcListId: listId, lists: list$ }});
    dialogRef.afterClosed().take(1).filter(n => n).subscribe(val => {
      this.store$.dispatch(new taskActions.MoveAllAction(val));
    });
  }

  handleDelList(list: TaskList) {
    const confirm = {
      title: '删除项目：',
      content: '确认要删除该任务列表？',
      confirmAction: '确认删除'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm, darkTheme: this.darkTheme}});

    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new listActions.DeleteTaskListAction(list));
      }
    });
  }

  handleCompleteTask(task: Task) {
    this.store$.dispatch(new taskActions.CompleteTaskAction(task));
  }

  handleMove(srcData, taskList: TaskList) {
    switch (srcData.tag) {
      case 'task-item': {
        this.store$.dispatch(new taskActions.MoveTaskAction({taskId: srcData.data.id, taskListId: taskList.id}));
        break;
      }
      case 'task-list': {
        this.store$.dispatch(new listActions.SwapOrderAction({src: srcData.data, target: taskList}));
        break;
      }
      default:
        break;
    }
  }

  handleAddTask(listId: string) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { darkTheme: this.darkTheme }});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .withLatestFrom(this.store$.select(fromRoot.getAuthUser), (val, user) => {
        return {
          task: val,
          ownerId: user.id
        };
      })
      .subscribe(({task, ownerId}) => {
        this.store$.dispatch(new taskActions.AddTaskAction({
          ...task,
          taskListId: listId,
          completed: false,
          ownerId: ownerId,
          createDate: new Date()
        }));
      });
  }

  handleUpdateTask(task: Task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { darkTheme: this.darkTheme, task: task }});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe((val) => {
        this.store$.dispatch(new taskActions.UpdateTaskAction({...task, ...val}));
      });
  }
}
