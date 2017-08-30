import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';
import {QuoteEffects} from './quote.effects';
import {ProjectEffects} from './project.effects';
import {TaskListEffects} from './task-list.effects';
import {TaskEffects} from './task.effects';
import {UserEffects} from './user.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      AuthEffects,
      QuoteEffects,
      ProjectEffects,
      TaskListEffects,
      TaskEffects,
      UserEffects
    ])
  ],
})
export class AppEffectsModule {}
