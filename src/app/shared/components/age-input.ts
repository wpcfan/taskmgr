import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
  OnDestroy,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
  AbstractControl
} from '@angular/forms';
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
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { convertToDate, isValidDate } from '../../utils/date.util';
import {
  map,
  distinctUntilChanged,
  filter,
  debounceTime,
  startWith
} from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { merge } from 'rxjs';
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
        <mat-form-field>
          <input
            matInput
            [matDatepicker]="birthPicker"
            type="text"
            placeholder="出生日期"
            formControlName="birthday"
          />
          <mat-datepicker-toggle
            matSuffix
            [for]="birthPicker"
          ></mat-datepicker-toggle>
          <mat-error>日期不正确</mat-error>
        </mat-form-field>
        <mat-datepicker touchUi="true" #birthPicker></mat-datepicker>
      </div>
      <ng-container formGroupName="age">
        <div class="age-num">
          <mat-form-field>
            <input
              matInput
              type="number"
              placeholder="年龄"
              formControlName="ageNum"
            />
          </mat-form-field>
        </div>
        <div>
          <mat-button-toggle-group
            formControlName="ageUnit"
            [(ngModel)]="selectedUnit"
          >
            <mat-button-toggle
              *ngFor="let unit of ageUnits"
              [value]="unit?.value"
            >
              {{ unit?.label }}
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <mat-error
          class="mat-body-2"
          *ngIf="form.get('age')?.hasError('ageInvalid')"
          >年龄或单位不正确</mat-error
        >
      </ng-container>
    </div>
  `,
  styles: [
    `
      .age-num {
        width: 50px;
      }
      .age-input {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: baseline;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgeInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  selectedUnit = AgeUnit.Year;
  form: FormGroup;
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' }
  ];
  @Input()
  daysTop = 90;
  @Input()
  daysBottom = 0;
  @Input()
  monthsTop = 24;
  @Input()
  monthsBottom = 1;
  @Input()
  yearsBottom = 1;
  @Input()
  yearsTop = 150;
  @Input()
  debounceTime = 300;
  private subBirth: Subscription;
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const initDate = convertToDate(subYears(Date.now(), 30));
    const initAge = this.toAge(initDate);
    this.form = this.fb.group({
      birthday: [parse(initDate), this.validateDate],
      age: this.fb.group(
        {
          ageNum: [initAge.age],
          ageUnit: [initAge.unit]
        },
        { validator: this.validateAge('ageNum', 'ageUnit') }
      )
    });
    const birthday = this.form.get('birthday');
    if (!birthday) {
      return;
    }
    const age = this.form.get('age');
    if (!age) {
      return;
    }
    const ageNum = this.form.get('age.ageNum');
    if (!ageNum) {
      return;
    }
    const ageUnit = this.form.get('age.ageUnit');
    if (!ageUnit) {
      return;
    }

    const birthday$ = birthday.valueChanges.pipe(
      map(d => ({ date: d, from: 'birthday' })),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(date => birthday.valid)
    );
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const age$ = combineLatest(ageNum$, ageUnit$).pipe(
      map((_num: number, _unit: AgeUnit) =>
        this.toDate({ age: _num, unit: _unit })
      ),
      map(d => ({ date: d, from: 'age' })),
      filter(_ => age.valid)
    );
    const merged$ = merge(birthday$, age$).pipe(filter(_ => this.form.valid));
    this.subBirth = merged$.subscribe(
      (date: { date: string; from: string }) => {
        const aged = this.toAge(date.date);
        if (date.from === 'birthday') {
          if (aged.age === ageNum.value && aged.unit === ageUnit.value) {
            return;
          }
          ageUnit.patchValue(aged.unit, {
            emitEvent: false,
            emitModelToViewChange: true,
            emitViewToModelChange: true
          });
          ageNum.patchValue(aged.age, { emitEvent: false });
          this.selectedUnit = aged.unit;
          this.propagateChange(date.date);
        } else {
          const ageToCompare = this.toAge(birthday.value);
          if (
            aged.age !== ageToCompare.age ||
            aged.unit !== ageToCompare.unit
          ) {
            birthday.patchValue(parse(date.date), { emitEvent: false });
            this.propagateChange(date.date);
          }
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  // 提供值的写入方法
  public writeValue(obj: Date) {
    if (obj) {
      const date = parse(convertToDate(obj));
      const birthday = this.form.get('birthday');
      if (!birthday) {
        return;
      }
      birthday.patchValue(date, { emitEvent: true });
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {}

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): { [key: string]: any } | null {
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

  validateDate(c: FormControl): { [key: string]: any } | null {
    const val = c.value;
    return isValidDate(val)
      ? null
      : {
          birthdayInvalid: true
        };
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;

      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result =
            ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop;
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result
        ? null
        : {
            ageInvalid: true
          };
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
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
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
        return convertToDate(subYears(now, age.age));
      }
      case AgeUnit.Month: {
        return convertToDate(subMonths(now, age.age));
      }
      case AgeUnit.Day: {
        return convertToDate(subDays(now, age.age));
      }
      default: {
        return '1991-01-01';
      }
    }
  }
}
