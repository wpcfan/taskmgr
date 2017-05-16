import { 
  Component, 
  Input,
  Output,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from "rxjs/Observable";
import * as models from '../../domain';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task.action';
import { Store } from "@ngrx/store";
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit{
  
  @Input() 
  list: models.TaskList;
  loading$: Observable<boolean>;
  tasks$: Observable<models.Task[]>;

  constructor(
    private dialog: MdDialog,
    private store$: Store<fromRoot.State>) { }

  ngOnInit(){
    this.store$.dispatch(new actions.LoadTasksAction(this.list.id));
    this.tasks$ = this.store$.select(fromRoot.getTasks);
    this.loading$ = this.store$.select(fromRoot.getTaskLoading);
  }

  onChangeListName(ev: Event){
    ev.preventDefault();
  }

  onAddListAfter(ev: Event){
    ev.preventDefault();
  }

  onCopyAllTasks(ev: Event){
    ev.preventDefault();
  }

  onMoveAllTasks(ev: Event){
    ev.preventDefault();
  }

  onDeleteList(ev: Event){
    ev.preventDefault();
  }

  onTaskComplete(ev: Event){
    ev.preventDefault();
  }

  onTaskClick(ev: Event){
    ev.preventDefault();
  }

  addNewTask(ev: Event){
    ev.preventDefault();
    this.dialog.open(NewTaskComponent, {data:{
      taskListId: this.list.id,
      user: {
        id: "1",
        name: "Peng Wang"
      }
    }});
  }
}
