import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {getProvinces, getCitiesByProvince, getAreasByCity} from '../../utils/area.util';
import {IdentityType} from "../../domain";
import {isValidAddr, extractInfo} from "../../utils/identity.util";
import {isValidDate} from "../../utils/date.util";

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
  selectedTab: number = 0;
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
    {value: IdentityType.Military, label: '军官证'},
    {value: IdentityType.Other, label: '其它'}
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
    
    const idNo$ = this.form.get('identity').valueChanges.debounceTime(300);
    idNo$.subscribe(id => {
      switch (id.identityType) {
        case IdentityType.IdCard: {
          this.form.get('identity').get('identityNo').setValidators(this.validateIdNumber);
          break;
        }
        case IdentityType.Passport: {
          this.form.get('identity').get('identityNo').setValidators(this.validatePassport);
          break;
        }
        case IdentityType.Military: {
          this.form.get('identity').get('identityNo').setValidators(this.validateMilitary);
          break;
        }
        default:
          break;
      }
    });
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
        avatar: value.avatar,
        identity: value.identity,
        address: value.address,
        dateOfBirth: value.dateOfBirth
      }));
  }

  validateIdNumber(c: FormControl): {[key: string]: any} {
    const value = c.value;
    if(value.length !== 18) return {idNotValid: true};
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    let result = false;
    if(pattern.test(value)){
      const info = extractInfo(value);
      if(isValidAddr(info.addrCode) && isValidDate(info.dateOfBirth)) {
        result = true;
      }
    }
    return result ? null : {idNotValid:  true}
  }

  validatePassport(c: FormControl): {[key: string]: any} {
    const value = c.value;
    if(value.length !== 9) return {idNotValid: true};
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if(pattern.test(value)){   
        result = true;
    }
    return result ? null : {idNotValid:  true}
  }

  validateMilitary(c: FormControl): {[key: string]: any} {
    const value = c.value;
    const pattern = /[\u4e00-\u9fa5](字第){1}(\d{4,8})(号?)$/;
    let result = false;
    if(pattern.test(value)){   
        result = true;
    }
    return result ? null : {idNotValid:  true}
  }

  prevTab() {
    this.selectedTab = 0;
  }

  nextTab() {
    this.selectedTab = 1;
  }
}
