import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './core';
import {SharedModule} from './shared';
import {LoginModule} from './login';
import {AppComponent} from './core/containers/app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'taskmgr'}),
    SharedModule,
    LoginModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
