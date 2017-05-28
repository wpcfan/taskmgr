import {Component, Input, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {getProvinces, getCitiesByProvince, getAreasByCity} from '../../utils/area.util';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import {Address} from '../../domain';

@Component({
  selector: 'app-area-list',
  template: `
    <div>
      <md-select placeholder="请选择省份" (change)="onProvinceChange($event.value)">
        <md-option *ngFor="let p of provinces" [value]="p">
          {{ p }}
        </md-option>
      </md-select>
    </div>
    <div>
      <md-select placeholder="请选择城市" (change)="onCityChange($event.value)">
        <md-option *ngFor="let c of cities$ | async" [value]="c">
          {{ c }}
        </md-option>
      </md-select>
    </div>
    <div>
      <md-select placeholder="请选择区县" (change)="onDistrictChange($event.value)">
        <md-option *ngFor="let d of districts$ | async" [value]="d">
          {{ d }}
        </md-option>
      </md-select>
    </div>
    <div class="street">
      <md-input-container class="full-width">
        <input mdInput placeholder="街道地址" (change)="onStreetChange($event.target.value)">
      </md-input-container>
    </div>
    `,
  styles: [`    
    .street{
      flex: 1 1 100%;
    }
    :host{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaListComponent implements ControlValueAccessor, OnInit, OnDestroy {
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  @Input() provinces = getProvinces();
  private _province = new Subject<string>();
  private _city = new Subject<string>();
  private _district = new Subject<string>();
  private _street = new Subject<string>();
  private _address: Address;
  private _sub: Subscription;
  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    const province$ = this.province;
    const city$ = this.city;
    const district$ = this.district;
    const street$ = this.street;
    const val$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      };
    });
    this._sub = val$.subscribe(v => {
      this.propagateChange(v);
    });

    // 根据省份的选择得到城市列表
    this.cities$ = province$.mergeMap(province => Observable.of(getCitiesByProvince(province)));
    // 根据省份和城市的选择得到地区列表
    this.districts$ = Observable
      .combineLatest(province$, city$, (p, c) => Object.assign({}, {province: p, city: c}))
      .mergeMap(a => Observable.of(getAreasByCity(a.province, a.city)));

  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): {[key: string]: any} {
    if (c.value) {

    }
    return null;
  }

  // 设置初始值
  public writeValue(obj: Address) {
    if (obj) {
      this._address = obj;
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

  onProvinceChange(val) {
    this._province.next(val);
  }

  onCityChange(val) {
    this._city.next(val);
  }

  onDistrictChange(val) {
    this._district.next(val);
  }

  onStreetChange(val) {
    this._street.next(val);
  }

  get province() {
    return this._province.asObservable();
  }

  get city() {
    return this._city.asObservable();
  }

  get district() {
    return this._district.asObservable();
  }

  get street() {
    return this._street.asObservable();
  }
}
