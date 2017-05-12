import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login';
import { AppComponent } from './app.component';
import { ProjectModule } from './project';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    TodoModule,
    LoginModule,
    ProjectModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
