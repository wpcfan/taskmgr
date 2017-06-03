import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)" novalidate>
      <h3 md-dialog-title>{{dialogTitle}}</h3>
      <div md-dialog-content>
        <md-input-container class="full-width">
          <input mdInput placeholder="列表名称" formControlName="name">
        </md-input-container>
      </div>
      <div md-dialog-actions>
        <button md-raised-button color="primary" type="submit" [disabled]="!form.valid">保存</button>
        <button md-dialog-close md-raised-button type="button">关闭</button>
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

  constructor(private oc: OverlayContainer,
              private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewTaskListComponent>) {
    this.oc.themeClass = this.data.darkTheme ? 'myapp-dark-theme' : null;
  }

  ngOnInit() {
    if (!this.data.name) {
      this.form = this.fb.group({
        name: ['', Validators.required]
      });
      this.dialogTitle = '创建列表：';
    } else {
      this.form = this.fb.group({
        name: [this.data.name, Validators.required],
      });
      this.dialogTitle = '修改列表：';
    }
  }

  onSubmit({value, valid}, event: Event) {
    event.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value.name);
  }
}
