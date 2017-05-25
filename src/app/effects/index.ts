import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';
import {QuoteEffects} from './quote.effects';
import {ProjectEffects} from './project.effects';
import {TaskListEffects} from './task-list.effects';
import {TaskEffects} from './task.effects';
import {UserEffects} from './user.effects';

export const effects = {
  auth: AuthEffects,
  quote: QuoteEffects,
  projects: ProjectEffects,
  tasklists: TaskListEffects,
  tasks: TaskEffects,
  users: UserEffects
};

@NgModule({
  imports: [
    EffectsModule.run(effects.auth),
    EffectsModule.run(effects.quote),
    EffectsModule.run(effects.projects),
    EffectsModule.run(effects.tasklists),
    EffectsModule.run(effects.tasks),
    EffectsModule.run(effects.users),
  ],
})
export class AppEffectsModule {
}
