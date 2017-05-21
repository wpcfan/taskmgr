import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
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
  avatars$: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>) { 
      this.avatars$ = Observable
        .range(0, 13)
        .map(i => `/assets/img/avatar/${i}.svg`)
        .reduce((r,x) => {
          return [...r, x]
        }, []);
    }

  ngOnInit() {
    const img = `/assets/img/avatar/${Math.floor(Math.random()*13).toFixed(0)}.svg`
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
      avatar: [img]
    });
  }

  onSubmit({value, valid}, e: Event){
    e.preventDefault();
    if(!valid) return;
    this.store$.dispatch(
      new actions.RegisterAction({
        password: value.password,
        name: value.name,
        email: value.email,
        avatar: value.avatar
      }));
  }

}
