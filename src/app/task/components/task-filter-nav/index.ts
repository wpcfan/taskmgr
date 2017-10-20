import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskFilter } from '../../../domain';
import { TaskFilterVM, TaskFilterPriorityVM } from '../../../vm';
// import { getTaskFilterVM, getTaskFilterByDesc, getTaskFilterByPriority } from '../../../utils/task-filter.util';
import * as fromRoot from '../../../reducers';
import * as TaskFilterActions from '../../../actions/task-filter.action';
import * as TaskFilterVMActions from '../../../actions/task-filter-vm.action';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<void>();

  form: FormGroup;
  taskFilterVM: TaskFilterVM;
  taskDesc: string;

  private taskFilter$: Observable<TaskFilter>;
  private taskFilterVM$: Observable<TaskFilterVM>;
  private descFilter$: Observable<string>;
  private _taskFilterSub: Subscription;
  private _taskFilterVMSub: Subscription;
  private _descFilterSub: Subscription;
  private taskFilter: TaskFilter;

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      descFilter: ['']
    });

    this.taskFilter$ = this.store$.select(fromRoot.getTaskFilterState);
    this.taskFilterVM$ = this.store$.select(fromRoot.getTaskFilterVMState);
    this.descFilter$ = this.form.controls['descFilter'].valueChanges;
  }

  ngOnInit() {
    this._taskFilterSub = this.taskFilter$.subscribe((filter: TaskFilter) => {
      this.taskFilter = filter;
      // this.taskFilterVM = getTaskFilterVM(filter);
      // console.log('<<Filter>>', JSON.stringify(this.taskFilterVM));
    });

    this._taskFilterVMSub = this.taskFilterVM$.subscribe((filterVM: TaskFilterVM) => {
      this.taskFilterVM = filterVM;
    })

    this._descFilterSub = this.descFilter$.debounceTime(300)
      .distinctUntilChanged()
      .subscribe((desc: string) => {
        this.taskDesc = desc.trim();
        // const updatedTaskFilter = getTaskFilterByDesc(this.taskFilter, this.taskDesc);
        // this.store$.dispatch(new TaskFilterActions.UpdateTaskFilterAction(updatedTaskFilter));
      });
  }

  ngOnDestroy() {
    if (this._taskFilterSub) {
      this._taskFilterSub.unsubscribe();
    }

    if (this._taskFilterVMSub) {
      this._taskFilterVMSub.unsubscribe();
    }

    if (this._descFilterSub) {
      this._descFilterSub.unsubscribe();
    }
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  onClearDesc(ev: Event) {
    ev.preventDefault();
    this.form.controls['descFilter'].setValue('');
  }

  onPriorityItemClicked(ev: Event, priority: TaskFilterPriorityVM) {
    ev.preventDefault();

    console.log('<<Filter Item Checked>>', JSON.stringify(priority));
    let priorityVMs: TaskFilterPriorityVM[] = this.taskFilterVM.priorityVMs;
    priorityVMs = priorityVMs.map((priorityVM: TaskFilterPriorityVM) => {
      return priorityVM.value === priority.value ? { ...priorityVM, checked: !priorityVM.checked } : priorityVM;
    });

    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction({ ...this.taskFilterVM, priorityVMs: priorityVMs }));
  }
}
