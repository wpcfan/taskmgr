import {ChangeDetectionStrategy, Component, forwardRef, OnInit, OnDestroy} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse
} from 'date-fns';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { toDate, isValidDate } from '../../utils/date.util';
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  template: `
    <div [formGroup]="form" class="age-input">
      <div>
        <md-input-container>
          <input mdInput type="date" placeholder="出生日期" formControlName="birthday">
          <md-error>日期不正确</md-error>
        </md-input-container>
      </div>
      <ng-container formGroupName="age">
        <div class="age-num">
          <md-input-container>
            <input mdInput type="number" placeholder="年龄" formControlName="ageNum">
          </md-input-container>
        </div>
        <div>
          <md-button-toggle-group formControlName="ageUnit">
            <md-button-toggle *ngFor="let unit of ageUnits" [value]="unit.value">
              {{ unit.label }}
            </md-button-toggle>
          </md-button-toggle-group>
        </div>
        <md-error class="mat-body-2" *ngIf="form.get('age').hasError('ageInvalid')">年龄或单位不正确</md-error>
      </ng-container>
    </div>
    `,
  styles: [`
    .age-num{
      width: 50px;
    }
    .age-input{
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      align-items: baseline;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  form: FormGroup;
  ageUnits: { value: AgeUnit; label: string }[] = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  dateOfBirth;
  selectedUnit = AgeUnit.Year;
  private subBirth: Subscription;
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const initDate = this.dateOfBirth ? this.dateOfBirth : toDate(subYears(Date.now(), 30));
    const initAge = this.toAge(initDate);
    this.form = this.fb.group({
      birthday: [initDate, this.validateDate],
      age:  this.fb.group({
        ageNum: [initAge.age],
        ageUnit: [initAge.unit]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    const birthday$ = this.form.get('birthday').valueChanges
      .map(d => ({date: d, from: 'birthday'}))
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(_ => this.form.get('birthday').valid);
    const ageNum$ = this.form.get('age').get('ageNum').valueChanges
      .startWith(initAge.age)
      .debounceTime(300)
      .distinctUntilChanged();
    const ageUnit$ = this.form.get('age').get('ageUnit').valueChanges
      .startWith(initAge.unit)
      .debounceTime(300)
      .distinctUntilChanged();
    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_num, _unit) => this.toDate({age: _num, unit: _unit}))
      .map(d => ({date: d, from: 'age'}));
    const merged$ = Observable
      .merge(birthday$, age$)
      .filter(_ => this.form.valid)
      .debug('[Age-Input][Merged]:');
    this.subBirth = merged$.subscribe(date => {
      if(date.from === 'birthday') {
        const age = this.toAge(date.date);
        if(age.age !== this.form.get('age').get('ageNum').value) {
          this.form.get('age').get('ageNum').patchValue(age.age, {emitEvent: false});
        }
        if(age.unit !== this.form.get('age').get('ageUnit').value) {
          this.form.get('age').get('ageUnit').patchValue(age.unit, {emitEvent: false});
        }
      } else {
        this.form.get('birthday').patchValue(date.date, {emitEvent: false});
      }
      this.propagateChange(date.date);
    });
  }

  ngOnDestroy() {
    if(this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  // 提供值的写入方法
  public writeValue(obj: string) {
    if (obj) {
      const date = toDate(obj);
      this.form.get('birthday').patchValue(date, {emitEvent: false});
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
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      ageInvalid: true
    };
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = parse(c.value);
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    }
  }

  validateAge(ageNumKey: string, ageUnitKey:string): {[key: string]: any} {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= 2 && ageNumVal < 150
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal > 3 && ageNumVal <= 24
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal > 0 && ageNumVal <= 90
          break;
        }
        default:
          result = false;
      }
      return result ? null : {
        ageInvalid: true
      }
    }
  }

  private toAge(dateStr: string): Age {
    const daysTop = 90; // 90 天以下，用天作为单位
    const monthsTop = 24; // 24 个月以下，用月作为单位
    const date = parse(dateStr);
    const now = new Date();
    if (isBefore(subDays(now, daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }

  private toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return toDate(subYears(now, age.age));
      }
      case AgeUnit.Month: {
        return toDate(subMonths(now, age.age));
      }
      case AgeUnit.Day: {
        return toDate(subDays(now, age.age));
      }
      default: {
        return this.dateOfBirth;
      }
    }
  }
}
