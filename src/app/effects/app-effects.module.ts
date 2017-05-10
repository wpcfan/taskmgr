import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
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

@NgModule({
  imports: [ 
    EffectsModule.run(effects.auth),
    EffectsModule.run(effects.todos),
    EffectsModule.run(effects.quote),
    EffectsModule.run(effects.projects),
   ],
})
export class AppEffectsModule {}