import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core';
import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login';
import { AppComponent } from './app.component';
import { ProjectModule } from './project';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    TodoModule,
    LoginModule,
    ProjectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
