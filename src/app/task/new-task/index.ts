import { ChangeDetectionStrategy, Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { toDate } from 'date-fns';
import { User, TaskHistory } from '../../domain';
import * as fromRoot from '../../reducers';
import * as TaskHistoryActions from '../../actions/task-history.action';

@Component({
  selector: 'app-new-task',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
      <h2 mdDialogTitle>{{dialogTitle}}</h2>
      <div mdDialogContent>
        <md-form-field class="full-width">
          <input mdInput type="text" placeholder="任务内容" formControlName="desc">
        </md-form-field>
        <md-radio-group class="full-width" formControlName="priority">
          <md-radio-button *ngFor="let priorityItem of priorities" [value]="priorityItem.value">
            {{priorityItem.label}}
          </md-radio-button>
        </md-radio-group>
        <div class="full-width">
          <app-chips-list [label]="'更改执行者'" [multiple]="false" formControlName="owner"></app-chips-list>
        </div>
        <md-form-field class="full-width">
          <input mdInput [mdDatepicker]="dueDatePicker" placeholder="选择截止日期" formControlName="dueDate">
          <md-datepicker-toggle mdSuffix [for]="dueDatePicker"></md-datepicker-toggle>
        </md-form-field>
        <md-datepicker touchUi="true" #dueDatePicker></md-datepicker>
        <md-form-field class="full-width">
          <input mdInput [mdDatepicker]="reminderPicker" placeholder="选择提醒日期" formControlName="reminder">
          <md-datepicker-toggle mdSuffix [for]="reminderPicker"></md-datepicker-toggle>
        </md-form-field>
        <md-datepicker touchUi="true" #reminderPicker></md-datepicker>
        <div class="full-width">
          <app-chips-list [label]="'更改参与者'" formControlName="followers"></app-chips-list>
        </div>
        <md-form-field class="full-width">
          <textarea mdInput placeholder="备注" formControlName="remark"></textarea>
        </md-form-field>
        <md-list>
          <md-list-item *ngFor="let history of taskHistories let i = index">
          <md-icon mdListIcon [svgIcon]="icons[i]"></md-icon>
            {{history.operator.name}}
          </md-list-item>
        </md-list>
      </div>
      <div md-dialog-actions class="full-width">
        <div fxLayout="row" *ngIf="notConfirm else confirm">
          <button md-raised-button color="primary" type="submit" [disabled]="!form.valid">
            保存
          </button>
          <button mdDialogClose md-raised-button type="button">关闭</button>
          <span fxFlex>
          </span>
          <button md-button color="warn" type="button" [disabled]="delInvisible" (click)="onDelClick(false)">删除</button>
        </div>
      </div>
    </form>
    <ng-template #confirm>
      <div fxLayout="row">
        <span class="fill-remaining-space mat-body-2">是否确定删除？</span>
        <button md-button color="warn" type="button" (click)="reallyDel()">确定</button>
        <button md-raised-button color="primary" type="button" (click)="onDelClick(true)">取消</button>
      </div>
    </ng-template>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit, OnDestroy {

  private taskHistories$: Observable<TaskHistory[]>;
  private _sub: Subscription;
  taskHistories: TaskHistory[] = [];
  icons: string[] = ['project', 'week'];

  form: FormGroup;
  dialogTitle: string;
  notConfirm = true;
  delInvisible = true;
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

  constructor(private fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<NewTaskComponent>,
    private store$: Store<fromRoot.State>) {
    this.taskHistories$ = this.store$.select(fromRoot.getTaskHistories);
  }

  ngOnInit() {
    if (!this.data.task) {
      this.form = this.fb.group({
        desc: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        priority: [3],
        dueDate: [],
        reminder: [],
        owner: [[this.data.owner]],
        followers: [[]],
        remark: ['', Validators.maxLength(40)]
      });
      this.dialogTitle = '创建任务：';
      this.delInvisible = true;
    } else {
      this.form = this.fb.group({
        desc: [this.data.task.desc, Validators.compose([Validators.required, Validators.maxLength(20)])],
        priority: [this.data.task.priority],
        dueDate: [toDate(this.data.task.dueDate)],
        reminder: [toDate(this.data.task.reminder)],
        owner: [this.data.task.owner ? [{ name: this.data.task.owner.name, value: this.data.task.owner.id }] : []],
        followers: [this.data.task.participants ? [...this.data.task.participants] : []],
        remark: [this.data.task.remark, Validators.maxLength(40)]
      });
      this.dialogTitle = '修改任务：';
      this.delInvisible = false;

      this.loadTaskHistories();
    }
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  loadTaskHistories() {
    this.store$.dispatch(new TaskHistoryActions.LoadTaskHistoryAction(this.data.task.id));

    this._sub = this.taskHistories$.subscribe(histories => {
      console.log('<loadTaskHistories>', JSON.stringify(histories));
      this.taskHistories = histories;
    });
  }

  onSubmit({ value, valid }: FormGroup, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({
      type: 'addOrUpdate', task: {
        desc: value.desc,
        participantIds: value.followers.map((u: User) => u.id),
        ownerId: value.owner.length > 0 ? value.owner[0].id : null,
        dueDate: value.dueDate,
        reminder: value.reminder,
        priority: value.priority,
        remark: value.remark
      }
    });
  }

  onDelClick(confirm: boolean) {
    this.notConfirm = confirm;
  }

  reallyDel() {
    this.dialogRef.close({ type: 'delete', task: this.data.task })
  }
}
