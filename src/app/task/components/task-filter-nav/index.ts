import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskFilter } from '../../../domain';
import { TaskFilterVM, TaskFilterPriorityVM } from '../../../vm';
import { getTaskFilterVM, getTaskFilterByPriority } from '../../../utils/task-filter.util';
import * as fromRoot from '../../../reducers';
import * as TaskFilterActions from '../../../actions/task-filter.action';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<void>();

  private taskFilter$: Observable<TaskFilter>;
  private _sub: Subscription;
  private taskFilter: TaskFilter;
  taskFilterVM: TaskFilterVM;

  constructor(private store$: Store<fromRoot.State>) {
    this.taskFilter$ = this.store$.select(fromRoot.getTaskFilter);
  }

  ngOnInit() {
    this._sub = this.taskFilter$.subscribe((filter: TaskFilter) => {
      this.taskFilter = filter;
      this.taskFilterVM = getTaskFilterVM(filter);
      console.log('<<Filter>>', JSON.stringify(this.taskFilterVM));
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  onPriorityItemClicked(ev: Event, priority: TaskFilterPriorityVM) {
    priority.checked = !priority.checked;

    const updatedTaskFilter = getTaskFilterByPriority(this.taskFilter, this.taskFilterVM.priorityVMs);
    this.store$.dispatch(new TaskFilterActions.UpdateTaskFilterAction(updatedTaskFilter));
  }
}
