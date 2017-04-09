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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: [''],
      password: ['', Validators.required],
      repeat: ['', Validators.required]
    });
  }

  onSubmit({value, valid}){
    if(!valid) return;
    this.store$.dispatch(
      new authActions.RegisterAction({
        username: value.username, 
        password: value.password,
        name: value.name,
        email: value.email
      }));
  }

}
