import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-new-project',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="onSubmit(form, $event)" novalidate>
      <md-card>
        <h3 md-dialog-title>{{dialogTitle}}</h3>
        <div md-dialog-content>
          <md-input-container class="full-width">
            <input mdInput placeholder="项目名称" formControlName="name">
          </md-input-container>
          <md-input-container class="full-width">
            <input mdInput placeholder="项目简介（选填）" formControlName="desc">
          </md-input-container>
          <app-image-list-select [cols]="6" [items]="thumbnails$ | async" formControlName="coverImg">
          </app-image-list-select>
        </div>
      </md-card>
      <div md-dialog-actions>
        <button md-raised-button color="primary" type="submit" [disabled]="!form.valid">保存</button>
        <button md-dialog-close md-raised-button type="button">关闭</button>
      </div>
    </form>
  `,
  styles: [`
    .form {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  thumbnails$: Observable<string[]>;

  constructor(private oc: OverlayContainer,
              private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewProjectComponent>) {
    this.oc.themeClass = this.data.darkTheme ? 'myapp-dark-theme' : null;
    this.thumbnails$ = this.data.thumbnails;
  }

  ngOnInit() {
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.dialogTitle = '修改项目：';
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [''],
        coverImg: [this.data.img]
      });
      this.dialogTitle = '创建项目：';
    }

  }

  onSubmit({value, valid}, event: Event) {
    event.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({name: value.name, desc: value.desc, coverImg: value.coverImg});
  }

}
