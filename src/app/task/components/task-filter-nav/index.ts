import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskFilter } from '../../../domain';
import { TaskFilterVM, TaskFilterPriorityVM } from '../../../vm';
import { getTaskFilterVM, getTaskFilterByDesc, getTaskFilterByPriority } from '../../../utils/task-filter.util';
import * as fromRoot from '../../../reducers';
import * as TaskFilterActions from '../../../actions/task-filter.action';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<void>();

  taskFilterVM: TaskFilterVM;
  form: FormGroup;

  private taskFilter$: Observable<TaskFilter>;
  private descFilter$: Observable<string>;
  private _taskFilterSub: Subscription;
  private _descFilterSub: Subscription;
  private taskFilter: TaskFilter;

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      descFilter: ['']
    });

    this.taskFilter$ = this.store$.select(fromRoot.getTaskFilter);
    this.descFilter$ = this.form.controls['descFilter'].valueChanges;
  }

  ngOnInit() {

    this._taskFilterSub = this.taskFilter$.subscribe((filter: TaskFilter) => {
      this.taskFilter = filter;
      this.taskFilterVM = getTaskFilterVM(filter);
      console.log('<<Filter>>', JSON.stringify(this.taskFilterVM));
    });

    this._descFilterSub = this.descFilter$.debounceTime(300)
      .distinctUntilChanged()
      .subscribe((desc: string) => {
        const updatedTaskFilter = getTaskFilterByDesc(this.taskFilter, desc.trim());
        this.store$.dispatch(new TaskFilterActions.UpdateTaskFilterAction(updatedTaskFilter));
      });
  }

  ngOnDestroy() {
    if (this._taskFilterSub) {
      this._taskFilterSub.unsubscribe();
    }

    if (this._descFilterSub) {
      this._descFilterSub.unsubscribe();
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
