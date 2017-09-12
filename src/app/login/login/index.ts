import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Quote} from '../../domain';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';
import * as actions from '../../actions/quote.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(private fb: FormBuilder,
              private store$: Store<fromRoot.State>) {
    this.quote$ = this.store$.select(fromRoot.getQuote);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['wpcfan@163.com', Validators.compose([Validators.required, Validators.email])],
      password: ['wp123456', Validators.required]
    });
    this.store$.dispatch({type: actions.QUOTE});
  }

  onSubmit({value, valid}: FormGroup, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(
      new authActions.LoginAction(value));
  }
}
