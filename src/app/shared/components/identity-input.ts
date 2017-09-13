import {ChangeDetectionStrategy, Component, forwardRef, OnInit, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Identity, IdentityType} from '../../domain';
import {isValidAddr, extractInfo} from '../../utils/identity.util';
import {isValidDate} from '../../utils/date.util';

@Component({
  selector: 'app-indentity-input',
  template: `
    <div>
      <md-select placeholder="证件类型" (change)="onIdTypeChange($event.value)" [(ngModel)]="identity.identityType">
        <md-option *ngFor="let type of identityTypes" [value]="type.value" >
          {{type.label}}
        </md-option>
      </md-select>
    </div>
    <div class="id-input">
      <md-form-field class="full-width">
        <input mdInput type="text" placeholder="证件号码" (change)="onIdNoChange($event.target.value)" [(ngModel)]="identity.identityNo">
        <md-error>证件号码输入有误</md-error>
      </md-form-field>
    </div>
  `,
  styles: [`
    .id-input{
      flex: 1;
    }
    :host{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: baseline;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  identityTypes: {value: IdentityType, label: string}[] = [
    {value: IdentityType.IdCard, label: '身份证'},
    {value: IdentityType.Insurance, label: '医保'},
    {value: IdentityType.Passport, label: '护照'},
    {value: IdentityType.Military, label: '军官证'},
    {value: IdentityType.Other, label: '其它'}
  ];
  identity: Identity = {identityType: null, identityNo: null};
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private _sub: Subscription;

  constructor() { }

  private propagateChange = (_: any) => {};

  ngOnInit() {
    const idType$ = this.idType;
    const idNo$ = this.idNo;
    const val$ = Observable.combineLatest(idType$, idNo$, (_type, _no) => {
      return {
        identityType: _type,
        identityNo: _no
      };
    });
    this._sub = val$.subscribe(v => {
      this.identity = v;
      this.propagateChange(v);
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  // 设置初始值
  public writeValue(obj: Identity) {
    if (obj) {
      this.identity = obj;
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): {[key: string]: any} | null {
    if (!c.value) {
      return null;
    }
    switch (c.value.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdNumber(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  private validateIdNumber(c: FormControl): {[key: string]: any} | null {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {
        idNotValid:  true
      };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    let result = false;
    if (pattern.test(val)) {
      const info = extractInfo(val);
      if (isValidAddr(info.addrCode) && isValidDate(info.dateOfBirth)) {
        result = true;
      }
    }
    return result ? null : {idNotValid:  true};
  }

  private validatePassport(c: FormControl): {[key: string]: any} | null {
    const value = c.value.identityNo;
    if (value.length !== 9) {
      return {idNotValid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  private validateMilitary(c: FormControl): {[key: string]: any} | null {
    const value = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  private get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  private get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }
}
