import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {TaskList} from '../../domain';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-copy-task',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
      <span matDialogTitle>{{dialogTitle}}</span>
      <div matDialogContent>
        <mat-select placeholder="选择目标列表" formControlName="targetList" class="full-width">
          <mat-option *ngFor="let list of lists$ | async" [value]="list.id">
            {{list.name}}
          </mat-option>
        </mat-select>
        <div matDialogActions>
          <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">确定</button>
          <button matDialogClose mat-raised-button type="button">关闭</button>
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

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<CopyTaskComponent>) {
  }

  ngOnInit() {
    this.lists$ = this.data.lists;
    this.dialogTitle = '移动所有任务';
    this.form = this.fb.group({
      targetList: ['', Validators.required]
    });
  }

  onSubmit({value, valid}: FormGroup, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({srcListId: this.data.srcListId, targetListId: value.targetList});
  }
}
