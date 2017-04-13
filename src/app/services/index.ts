import { AuthService } from './auth.service';
import { ProjectService } from './project.service';
import { QuoteService } from './quote.service';
import { TodoService } from './todo.service';
import { AuthGuardService } from './auth-guard.service'

export const services = {
  auth_guard: AuthGuardService,
  auth: AuthService,
  project: ProjectService,
  quote: QuoteService,
  todo: TodoService
}