import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';
import {User} from '../../domain';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
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

  constructor(private oc: OverlayContainer,
              private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewTaskComponent>) {
    this.oc.themeClass = this.data.darkTheme ? 'myapp-dark-theme' : null;
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
      dueDate: value.dueDate,
      reminder: value.reminder,
      priority: value.priority,
      remark: value.remark
    });
  }
}
