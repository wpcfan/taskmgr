import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
      <h3 mdDialogTitle>{{dialogTitle}}</h3>
      <div mdDialogContent>
        <md-form-field class="full-width">
          <input mdInput placeholder="列表名称" formControlName="name">
        </md-form-field>
      </div>
      <div md-dialog-actions>
        <button md-raised-button color="primary" type="submit" [disabled]="!form.valid">保存</button>
        <button mdDialogClose md-raised-button type="button">关闭</button>
      </div>
    </form>
  `,
  styles: [`
    :host{
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;

  constructor(private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewTaskListComponent>) {
  }

  ngOnInit() {
    if (!this.data.name) {
      this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]
      });
      this.dialogTitle = '创建列表：';
    } else {
      this.form = this.fb.group({
        name: [this.data.name, Validators.compose([Validators.required, Validators.maxLength(10)])],
      });
      this.dialogTitle = '修改列表：';
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value.name);
  }
}
