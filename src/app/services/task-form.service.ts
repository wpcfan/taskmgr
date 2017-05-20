import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import * as fromRoot from '../reducers';
import { User, Task } from "../domain";

@Injectable()
export class TaskFormService {
  constructor(private store$: Store<fromRoot.State>){}

  prepareUpdateTask(task: Task){
    const participants$ = Observable
      .of(task.participantIds)
      .withLatestFrom(
        this.store$.select(fromRoot.getUserEntities), 
        (ids, entities) => {
          console.log(JSON.stringify(entities))
          return ids.map(id => entities[id] as User)
        });
    const owner$ = this.store$.select(fromRoot.getUserEntities);
    return Observable.combineLatest(participants$, owner$, (people, entities) => {
      const data = {
        taskListId: task.taskListId,
        task: task,
        paticipants: people,
        owner: entities[task.ownerId]
      }
      return data;
    });
  }

  prepareAddTask(taskListId:  string){

    const items$ = this.store$
      .select(fromRoot.getTasks)
      .map(tasks => tasks.filter(task => task.taskListId === taskListId).length);
    
    const owner$ = this.store$.select(fromRoot.getAuthUser);
    return Observable.combineLatest(items$, owner$, (count, owner: User) => {
      const data = {
        taskListId: taskListId,
        owner: owner,
        paticipants: [owner],
        order: count+1
      };
      return data;
    })
  }
}