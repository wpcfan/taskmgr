import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { ProjectService } from './project.service';
import { QuoteService } from './quote.service';
import { TodoService } from './todo.service';
import { TaskListService } from './task-list.service';
import { TaskService } from "./task.service";
import { AuthGuardService } from './auth-guard.service';

export  {
  AuthGuardService,
  AuthService,
  ProjectService,
  QuoteService,
  TodoService,
  TaskListService,
  TaskService
}

@NgModule({})
export class ServicesModule {
  static forRoot(){
    return {
      ngModule: ServicesModule,
      providers: [
        AuthGuardService, 
        AuthService, 
        ProjectService, 
        QuoteService, 
        TodoService,
        TaskListService,
        TaskService
      ]
    }
  }
}