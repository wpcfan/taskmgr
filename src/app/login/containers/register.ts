import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {extractInfo, getAddrByCode, isValidAddr} from '../../utils/identity.util';
import {isValidDate} from '../../utils/date.util';

@Component({
  selector: 'app-register',
  template: `
  <form fxFlex fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center stretch" [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
    <mat-card fxFlex="1 1 auto">
      <mat-tab-group [dynamicHeight]="true" [selectedIndex]="selectedTab" (selectedTabChange)="onTabChange($event.index)">
        <mat-tab label="帐号信息">
          <mat-form-field class="full-width">
            <input matInput placeholder="电子邮件" formControlName="username">
          </mat-form-field>
          <mat-form-field class="full-width">
            <input matInput type="text" placeholder="您的名字" formControlName="name">
          </mat-form-field>
          <mat-form-field class="full-width">
            <input matInput type="password" placeholder="您的密码" formControlName="password">
          </mat-form-field>
          <mat-form-field class="full-width">
            <input matInput type="password" placeholder="为避免失误请再次输入" formControlName="repeat">
          </mat-form-field>
          <app-image-list-select
            [useSvgIcon]="true"
            [cols]="6"
            [title]="'选择头像：'"
            [items]="avatars$ | async"
            formControlName="avatar">
          </app-image-list-select>
          <div class="full-width" fxLayout="row">
            <button mat-raised-button type="button" (click)="nextTab()">下一步</button>
            <span class="fill-remaining-space"></span>
            <span>
              <span>已有账户？ <a routerLink="/login">登录</a></span>
              <span>忘记 <a routerLink="/forgot">密码？</a></span>
            </span>
          </div>
        </mat-tab>
        <mat-tab label="个人信息">
          <app-indentity-input formControlName="identity" class="full-width control-padding">
          </app-indentity-input>
          <div class="full-width control-padding">
            <app-age-input formControlName="dateOfBirth"></app-age-input>
          </div>
          <div class="full-width control-padding">
            <app-area-list formControlName="address"></app-area-list>
          </div>
          <div class="full-width" fxLayout="row">
            <button mat-raised-button type="button" (click)="prevTab()">上一步</button>
            <button mat-raised-button type="submit" [disabled]="!form.valid">注册</button>
            <span class="fill-remaining-space"></span>
            <span>
              <span>已有账户？ <a routerLink="/login">登录</a></span>
              <span>忘记 <a routerLink="/forgot">密码？</a></span>
            </span>
          </div>
        </mat-tab>
      </mat-tab-group>
    </mat-card>
  </form>
  `,
  styles: [`
    .text-right {
      margin: 10px;
      text-align: end;
    }

    .control-padding{
      margin-top: 10px;
      padding-top: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  selectedTab = 0;
  form: FormGroup;
  avatars$: Observable<string[]>;
  private _sub: Subscription;
  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder,
              private store$: Store<fromRoot.State>) {

    this.avatars$ = Observable
      .range(1, 16)
      .map(i => `${this.avatarName}:svg-${i}`)
      .reduce((r, x) => [...r, x], []);
  }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      repeat: ['', Validators.required],
      avatar: [img],
      dateOfBirth: [''],
      address: ['', Validators.maxLength(80)],
      identity: []
    });
    const id$ = this.form.get('identity')!.valueChanges
      .debug('id$: ')
      .debounceTime(300)
      .filter(v => this.form.get('identity')!.valid);

    this._sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.patchValue({address: addr});
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
      if (isValidDate(info.dateOfBirth)) {
        const date = info.dateOfBirth;
        this.form.patchValue({dateOfBirth: date});
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  onSubmit({value, valid}: FormGroup, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(
      new actions.RegisterAction({
        password: value.password,
        name: value.name,
        username: value.username,
        avatar: value.avatar,
        identity: value.identity,
        address: value.address,
        dateOfBirth: value.dateOfBirth
      }));
  }

  prevTab() {
    this.selectedTab = 0;
  }

  nextTab() {
    this.selectedTab = 1;
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }
}
