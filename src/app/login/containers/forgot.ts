import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-forgot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form fxLayout="row" [formGroup]="form" (ngSubmit)="onSubmit(form)">
    <mat-card fxFlex>
      <mat-card-header>
        <mat-card-title> 忘记密码：</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field class="full-width">
          <input matInput placeholder="注册时使用的电子邮箱" formControlName="username">
        </mat-form-field>
        <button mat-raised-button type="submit" [disabled]="!form.valid">找回密码</button>
      </mat-card-content>
      <mat-card-actions class="text-right">
        <p>还没有账户？ <a routerLink="/register">注册</a></p>
        <p>已有账户 <a routerLink="/login">登录</a></p>
      </mat-card-actions>
    </mat-card>
  </form>
  `,
  styles: [`
    .text-right {
      margin: 10px;
      text-align: end;
    }
  `]
})
export class ForgotComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store$: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required]
    });
  }

  onSubmit({value, valid}: FormGroup) {
    if (!valid) {
      return;
    }
  }
}
