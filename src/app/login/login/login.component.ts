import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
