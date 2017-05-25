import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {
  getProvinces,
  getCitiesByProvince,
  getAreasByCity
} from '../../utils/area.util';
import { IdentityType } from "../../domain";

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  avatars$: Observable<string[]>;
  provinces: string[];
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  ageUnits: { value: AgeUnit, label: string}[] = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  identityTypes: {value: IdentityType, label: string}[] = [
    {value: IdentityType.IdCard, label: '身份证'},
    {value: IdentityType.Insurance, label: '医保'},
    {value: IdentityType.Passport, label: '护照'},
    {value: IdentityType.SpecialDistrict, label: '港澳通行证'},
    {value: IdentityType.ResidenceBooklet, label: '户口簿'},
    {value: IdentityType.DriverLicense, label: '驾照'},
    {value: IdentityType.Military, label: '军官证'},
    {value: IdentityType.Soldier, label: '士兵证'},
    {value: IdentityType.Civilian, label: '文职官员证'},
    {value: IdentityType.Civilian, label: '其它'}
  ];
  constructor(private fb: FormBuilder,
              private store$: Store<fromRoot.State>) {
    this.avatars$ = Observable
      .range(0, 13)
      .map(i => `/assets/img/avatar/${i}.svg`)
      .reduce((r, x) => {
        return [...r, x];
      }, []);
  }

  ngOnInit() {
    const img = `/assets/img/avatar/${Math.floor(Math.random() * 13).toFixed(0)}.svg`;
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
      avatar: [img],
      dateOfBirth: [''],
      age: [''],
      ageUnit: [''],
      address: this.fb.group({
        province: [''],
        city: [''],
        district: [''],
        street: ['']
      }),
      identity: this.fb.group({
        identityNo: [''],
        identityType: ['']
      })
    });
    // 初始化省份数组
    this.provinces = getProvinces();
    // 省份的选择变化流
    const province$ = this.form.get('address').get('province').valueChanges;
    // 城市的选择变化流
    const city$ = this.form.get('address').get('city').valueChanges;
    // 根据省份的选择得到城市列表
    this.cities$ = province$.mergeMap(province => Observable.of(getCitiesByProvince(province)));
    // 根据省份和城市的选择得到地区列表
    this.districts$ = Observable
      .combineLatest(province$, city$, (p, c) => Object.assign({}, {province: p, city: c}))
      .mergeMap(a => Observable.of(getAreasByCity(a.province, a.city)));
  }

  onSubmit({value, valid}, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(
      new actions.RegisterAction({
        password: value.password,
        name: value.name,
        email: value.email,
        avatar: value.avatar
      }));
  }

}
