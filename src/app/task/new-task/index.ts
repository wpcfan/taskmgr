import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdAutocompleteTrigger, MdDialogRef, OverlayContainer} from '@angular/material';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/concat';
import {UserService} from '../../services';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task.action';
import {User} from '../../domain';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit, OnDestroy {
  form: FormGroup;
  dialogTitle: string;
  subTheme: Subscription;
  priorities: { label: string; value: number }[] = [
    {
      label: '普通',
      value: 3
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '紧急',
      value: 1
    },
  ];
  @ViewChild('assignee') trigger: MdAutocompleteTrigger;

  constructor(private oc: OverlayContainer,
              private fb: FormBuilder,
              private store$: Store<fromRoot.State>,
              private service: UserService,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewTaskComponent>) {
    this.subTheme = this.store$.select(fromRoot.getTheme)
      .subscribe(result => oc.themeClass = result ? 'myapp-dark-theme' : null);
  }

  ngOnInit() {
    if (!this.data.task) {
      this.form = this.fb.group({
        desc: ['', Validators.required],
        priority: [3],
        dueDate: [],
        reminder: [],
        owner: [[]],
        followers: [[]],
        remark: ['']
      });
      this.dialogTitle = '创建任务：';
    } else {
      this.form = this.fb.group({
        desc: [this.data.task.desc, Validators.required],
        priority: [this.data.task.priority],
        dueDate: [this.data.task.dueDate],
        reminder: [this.data.task.reminder],
        owner: [this.data.task.owner ? [{name: this.data.task.owner.name, value: this.data.task.owner.id}] : []],
        followers: [this.data.task.paticipants ? [...this.data.task.paticipants] : []],
        remark: [this.data.task.remark]
      });
      this.dialogTitle = '修改任务：';
    }
  }

  ngOnDestroy() {
    if (this.subTheme) {
      this.subTheme.unsubscribe();
    }
  }

  onSubmit({value, valid}, event: Event) {
    event.preventDefault();
    if (!valid) {
      return;
    }
    if (!this.data.task) {
      this.store$.dispatch(
        new actions.AddTaskAction({
          desc: value.desc,
          taskListId: this.data.taskListId,
          ownerId: value.owner.id,
          completed: false,
          participantIds: value.followers.map(u => u.id),
          dueDate: value.dueDate,
          reminder: value.reminder,
          createDate: new Date(),
          priority: value.priority,
          remark: value.remark
        }));
    } else {
      this.store$.dispatch(
        new actions.UpdateTaskAction({
          id: this.data.task.id,
          desc: value.desc,
          taskListId: this.data.task.taskListId,
          ownerId: value.owner.id,
          completed: false,
          participantIds: value.followers.map(u => u.id),
          dueDate: value.dueDate,
          reminder: value.reminder,
          createDate: this.data.task.createDate,
          priority: value.priority,
          // order: this.data.task.order,
          // tags: ['something'],
          remark: value.remark
        }));
    }
    this.dialogRef.close();
  }

}
