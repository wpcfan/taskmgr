import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      name: ['', Validators.required],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      repeat: ['', Validators.required]
    });
  }

  onSubmit({value, valid}){
    if(!valid) return;
    this.store$.dispatch(
      new actions.RegisterAction({
        password: value.password,
        name: value.name,
        email: value.email
      }));
  }

}
