import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core';
import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module';

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
    ProjectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
