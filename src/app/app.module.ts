import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    LoginModule,
    TodoModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
