import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from './core';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login';
import { AppComponent } from './app.component';
import { ProjectModule } from './project';
import { PageNotFoundComponent } from './page-not-found';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    TodoModule,
    LoginModule,
    ProjectModule,
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
