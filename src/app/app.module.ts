import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './core';
import {LoginModule} from './login';
import {AppComponent} from './app.component';
import {ProjectModule} from './project';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    ProjectModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
