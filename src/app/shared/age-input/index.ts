import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
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
    <div>
      <md-input-container>
        <input mdInput 
          type="date" 
          placeholder="出生日期" 
          [value]="dateOfBirth"
          (change)="onBirthdayChange($event.target.value)"
          >
      </md-input-container>
    </div>
    <div>
      <md-input-container>
        <input mdInput
          type="number"
          placeholder="年龄" 
          [(ngModel)]="age.age"
          (change)="onAgeNumChange()"
          >
      </md-input-container>
    </div>
    <div>
      <md-button-toggle-group [(ngModel)]="age.unit" (change)="onAgeUnitChange()">
        <md-button-toggle
          *ngFor="let unit of ageUnits"
          [value]="unit.value">
          {{ unit.label }}
        </md-button-toggle>
      </md-button-toggle-group>
    </div>
    `,
  styles: [`
    :host{
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
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
  
  
  age: Age;
  ageUnits: { value: AgeUnit; label: string }[] = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  private readonly dateFormat = 'YYYY-MM-DD';
  private readonly daysTop = 90; // 90 天以下，用天作为单位
  private readonly monthsTop = 24; // 24 个月以下，用月作为单位
  private propagateChange = (_: any) => {};
  @Input() dateOfBirth = format(subYears(Date.now(), 50), this.dateFormat);
  constructor() { }

  ngOnInit() { 
    this.age = this.toAge(parse(this.dateOfBirth));
  }

  // 提供值的写入方法
  public writeValue(obj: string) {
    if (obj && isValid(parse(obj))) {
      this.dateOfBirth = format(obj, this.dateFormat);
      this.age = this.toAge(parse(this.dateOfBirth));
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

  onBirthdayChange(date: string) {
    this.dateOfBirth = date;
    this.propagateChange(date);
    this.age = this.toAge(parse(this.dateOfBirth));
  }

  onAgeNumChange() {
    this.dateOfBirth = this.toDate(this.age);
  }

  onAgeUnitChange() {
    this.dateOfBirth = this.toDate(this.age);
  }


  private toAge(date: Date): Age {
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      }
    }
    if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      }
    }
    return {
      age: differenceInYears(now, date),
      unit: AgeUnit.Year
    }
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