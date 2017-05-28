import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {isValidAddr, extractInfo} from "../../utils/identity.util";

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
  ageUnits: { value: AgeUnit, label: string}[] = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
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
      address: [],
      identity: []
    });
    
    const idNo$ = this.form.get('identity').valueChanges;
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

  prevTab() {
    this.selectedTab = 0;
  }

  nextTab() {
    this.selectedTab = 1;
  }
}
