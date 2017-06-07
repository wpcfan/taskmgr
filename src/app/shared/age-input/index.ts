import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isPast,
  isValid,
  format,
  parse
} from 'date-fns';
import {Observable} from 'rxjs/Observable';

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
        </md-input-container>
      </div>
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
export class AgeInputComponent implements ControlValueAccessor, OnInit {

  form: FormGroup;
  fromDate: boolean = false;
  ageUnits: { value: AgeUnit; label: string }[] = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  private readonly dateFormat = 'YYYY-MM-DD';
  @Input() dateOfBirth;
  private readonly daysTop = 90; // 90 天以下，用天作为单位
  private readonly monthsTop = 24; // 24 个月以下，用月作为单位
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const initDate = this.dateOfBirth ? this.dateOfBirth : format(subYears(Date.now(), 30), this.dateFormat);
    const initAge = this.toAge(initDate);
    this.form = this.fb.group({
      birthday: [initDate],
      ageNum: [initAge.age],
      ageUnit: [initAge.unit]
    });
    const birthday$ = this.form.get('birthday').valueChanges.distinctUntilChanged().startWith(initDate);
    const ageNum$ = this.form.get('ageNum').valueChanges.distinctUntilChanged().startWith(initAge.age);
    const ageUnit$ = this.form.get('ageUnit').valueChanges.distinctUntilChanged().startWith(initAge.unit);
    birthday$.subscribe(date => {
      const age = this.toAge(date);
      this.form.get('ageNum').patchValue(age.age);
      this.form.get('ageUnit').patchValue(age.unit);
      this.form.updateValueAndValidity({onlySelf: true, emitEvent: false});
      this.propagateChange(date);
    });
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_num, _unit) => this.toDate({age: _num, unit: _unit}));
    age$.subscribe(date => {
      const calcAge = this.toAge(this.form.get('birthday').value);
      if(calcAge.age !== this.form.get('ageNum').value || calcAge.unit !== this.form.get('ageUnit').value) {
        this.form.get('birthday').patchValue(date);
      }
    });
  }

  // 提供值的写入方法
  public writeValue(obj: string) {
    if (obj && isValid(parse(obj))) {
      const date = format(obj, this.dateFormat);
      this.fromDate = true;
      this.form.get('birthday').patchValue(date);
      this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
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
    if (isValid(parse(val)) && isPast(val)) {
      return null;
    }
    return {
      ageInvalid: true
    };
  }

  private toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    }
    if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    }
    return {
      age: differenceInYears(now, date),
      unit: AgeUnit.Year
    };
  }

  private toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.dateFormat);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.dateFormat);
      }
      default: {
        return this.dateOfBirth;
      }
    }
  }
}
