import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-task',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
      <h2 md-dialog-title>{{dialogTitle}}</h2>
      <div md-dialog-content>
        <md-input-container class="full-width">
          <input mdInput type="text" placeholder="任务内容" formControlName="desc">
        </md-input-container>
        <md-radio-group class="full-width" formControlName="priority">
          <md-radio-button *ngFor="let priorityItem of priorities" [value]="priorityItem.value">
            {{priorityItem.label}}
          </md-radio-button>
        </md-radio-group>
        <div class="full-width">
          <app-chips-list [label]="'更改执行者'" [multiple]="false" formControlName="owner"></app-chips-list>
        </div>
        <md-input-container class="full-width">
          <input mdInput [mdDatepicker]="dueDatePicker" placeholder="选择截止日期" formControlName="dueDate">
          <button mdSuffix [mdDatepickerToggle]="dueDatePicker" type="button"></button>
        </md-input-container>
        <md-datepicker touchUi="true" #dueDatePicker></md-datepicker>
        <md-input-container class="full-width">
          <input mdInput [mdDatepicker]="reminderPicker" placeholder="选择提醒日期" formControlName="reminder">
          <button mdSuffix [mdDatepickerToggle]="reminderPicker" type="button"></button>
        </md-input-container>
        <md-datepicker touchUi="true" #reminderPicker></md-datepicker>
        <div class="full-width">
          <app-chips-list [label]="'更改参与者'" formControlName="followers"></app-chips-list>
        </div>
        <md-input-container class="full-width">
          <textarea mdInput placeholder="备注" formControlName="remark"></textarea>
        </md-input-container>
      </div>
      <div md-dialog-actions>
        <button md-raised-button color="primary" type="submit" [disabled]="!form.valid">
          保存
        </button>
        <button md-dialog-close md-raised-button type="button">关闭</button>
      </div>
    </form>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {

  form: FormGroup;
  dialogTitle: string;
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
              private dialogRef: MdDialogRef<NewTaskComponent>) {}

  ngOnInit() {
    if (!this.data.task) {
      this.form = this.fb.group({
        desc: ['', Validators.required],
        priority: [3],
        dueDate: [],
        reminder: [],
        owner: [[this.data.owner]],
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
        followers: [this.data.task.participants ? [...this.data.task.participants] : []],
        remark: [this.data.task.remark]
      });
      this.dialogTitle = '修改任务：';
    }
  }

  onSubmit({value, valid}, event: Event) {
    event.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({
      desc: value.desc,
      participantIds: value.followers.map(u => u.id),
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      dueDate: value.dueDate,
      reminder: value.reminder,
      priority: value.priority,
      remark: value.remark
    });
  }
}
