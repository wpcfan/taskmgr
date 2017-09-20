import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Quote} from '../../domain';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';
import * as actions from '../../actions/quote.action';

@Component({
  selector: 'app-login',
  template: `
  <form fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center" [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
    <md-card fxFlex="0 1 20rem">
      <md-card-header>
        <md-card-title> 登录：</md-card-title>
      </md-card-header>
      <md-card-content>
        <md-form-field class="full-width">
          <input mdInput type="text" placeholder="您的Email" formControlName="email">
          <md-error>用户名是必填项哦</md-error>
        </md-form-field>
        <md-form-field class="full-width">
          <input mdInput type="password" placeholder="您的密码" formControlName="password">
          <md-error>密码不正确哦</md-error>
        </md-form-field>
        <button md-raised-button type="submit" [disabled]="!form.valid">登录</button>
      </md-card-content>
      <md-card-actions class="text-right">
        <p>还没有账户？ <a routerLink="/register">注册</a></p>
        <p>忘记 <a routerLink="/forgot">密码？</a></p>
      </md-card-actions>
    </md-card>
    <md-card fxFlex="0 1 20rem">
      <md-card-header>
        <md-card-title> 佳句</md-card-title>
        <md-card-subtitle>
          {{(quote$ | async)?.cn}}
        </md-card-subtitle>
      </md-card-header>
      <img mdCardImage [src]="(quote$ | async)?.pic">
      <md-card-content>
        <p> {{(quote$ | async)?.en}}</p>
      </md-card-content>
    </md-card>
  </form>
  `,
  styles: [`
  .text-right {
    margin: 10px;
    text-align: end;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(private fb: FormBuilder,
              private store$: Store<fromRoot.State>) {
    this.quote$ = this.store$.select(fromRoot.getQuoteState);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['wpcfan@163.com', Validators.compose([Validators.required, Validators.email])],
      password: ['wp123456', Validators.required]
    });
    this.store$.dispatch({type: actions.QUOTE});
  }

  onSubmit({value, valid}: FormGroup, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(
      new authActions.LoginAction(value));
  }
}
