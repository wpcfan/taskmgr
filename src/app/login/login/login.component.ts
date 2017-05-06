import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';
import * as entities from '../../domain';
import * as actions from '../../actions/quote.action';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
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
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.store$.dispatch({type: actions.ActionTypes.QUOTE});
  }
  onSubmit({value, valid}, e: Event){
    if(!valid) return;
    this.store$.dispatch(
      new authActions.LoginAction({
        email: value.email, 
        password: value.password
      }));
    e.preventDefault();
  }
}
