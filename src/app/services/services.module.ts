import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { ProjectService } from './project.service';
import { QuoteService } from './quote.service';
import { TodoService } from './todo.service';
import { AuthGuardService } from './auth-guard.service'

export const services = {
  authGuard: AuthGuardService,
  auth: AuthService,
  project: ProjectService,
  quote: QuoteService,
  todo: TodoService
}

@NgModule({})
export class ServicesModule {
  static forRoot(){
    return {
      ngModule: ServicesModule,
      providers: [
        services.auth, 
        services.authGuard, 
        services.project, 
        services.quote, 
        services.todo
      ]
    }
  }
}