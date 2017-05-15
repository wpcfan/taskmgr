import { 
  Component, 
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { Observable } from "rxjs/Observable";
import * as models from '../../domain';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task.action';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{
  
  @Input() 
  list: models.TaskList;
  loading$: Observable<boolean>;
  tasks$: Observable<models.Task[]>;

  constructor(private store$: Store<fromRoot.State>) { }

  ngOnInit(){
    this.store$.dispatch(new actions.LoadTasksAction(this.list.id));
    this.tasks$ = this.store$.select(fromRoot.getTasks);
    this.loading$ = this.store$.select(fromRoot.getTaskLoading);
  }

}
