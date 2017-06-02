import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import { extractInfo, getAddrByCode, isValidAddr } from '../../utils/identity.util';
import {isValidDate, toDate} from '../../utils/date.util';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private _sub: Subscription;
  selectedTab = 0;
  form: FormGroup;
  avatars$: Observable<string[]>;

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
      address: [],
      identity: []
    });
    const id$ = this.form.get('identity').valueChanges.debounceTime(300).filter(v => {
      const valid = this.form.get('identity').valid;
      console.log(valid);
      return valid;
    });

    this._sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
        this.form.get('address').updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
      if (isValidDate(info.dateOfBirth)) {
        const date = toDate(info.dateOfBirth);
        this.form.patchValue({
          dateOfBirth: date
        });
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
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

  onTabChange(index) {
    this.selectedTab = index;
  }
}
