import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {TaskList} from '../../domain';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-copy-task',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
      <span md-dialog-title>{{dialogTitle}}</span>
      <div md-dialog-content>
        <md-select placeholder="选择目标列表" formControlName="targetList" class="full-width">
          <md-option *ngFor="let list of lists$ | async" [value]="list.id">
            {{list.name}}
          </md-option>
        </md-select>
        <div>
          <button md-raised-button color="primary" type="submit" [disabled]="!form.valid">确定</button>
          <button md-dialog-close md-raised-button type="button">关闭</button>
        </div>
      </div>
    </form>
    `,
  styles: [``]
})
export class CopyTaskComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  lists$: Observable<TaskList>;

  constructor(private oc: OverlayContainer,
              private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<CopyTaskComponent>) {
    this.oc.themeClass = this.data.darkTheme ? 'myapp-dark-theme' : null;
  }

  ngOnInit() {
    this.lists$ = this.data.lists;
    if (this.data.type === 'move') {
      this.dialogTitle = '移动所有任务';
    }
    this.form = this.fb.group({
      targetList: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, $event) {
    event.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({srcListId: this.data.srcListId, targetListId: value.targetList});
  }
}
