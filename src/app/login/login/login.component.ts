import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';
import * as entities from '../../domain';
import * as actions from '../../actions/quote.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<entities.Quote>
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>) { 
      this.quote$ = this.store$.select(fromRoot.getQuote);
    }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.store$.dispatch({type: actions.ActionTypes.QUOTE});
  }
  onSubmit({value, valid}){
    if(!valid) return;
    this.store$.dispatch(
      new authActions.LoginAction({
        username: value.username, 
        password: value.password
      }));
  }
}
