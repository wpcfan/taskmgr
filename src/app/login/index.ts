import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './containers/login';
import {RegisterComponent} from './containers/register';
import {ForgotComponent} from './containers/forgot';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent, ForgotComponent]
})
export class LoginModule {
}
