import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { QuoteEffects } from './quote.effects';
import { ProjectEffects } from './project.effects';
import { TaskListEffects } from './task-list.effects';
import { TaskEffects } from './task.effects';
import { TaskFilterEffects } from './task-filter.effect';
import { TaskFilterVMEffects } from './task-filter-vm.effect';
import { TaskHistoryEffects } from './task-history.effects';
import { ProjectTaskHistoryEffects } from './project-task-history.effect';
import { UserEffects } from './user.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      AuthEffects,
      QuoteEffects,
      ProjectEffects,
      TaskListEffects,
      TaskEffects,
      TaskFilterEffects,
      TaskFilterVMEffects,
      TaskHistoryEffects,
      ProjectTaskHistoryEffects,
      UserEffects
    ])
  ],
})
export class AppEffectsModule { }
