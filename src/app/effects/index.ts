import { AuthEffects } from './auth.effects';
import { QuoteEffects } from './quote.effects';
import { TodoEffects } from './todo.effects';
import { ProjectEffects } from './project.effects';

export const effects = {
  auth: AuthEffects,
  quote: QuoteEffects,
  todos: TodoEffects,
  projects: ProjectEffects
}