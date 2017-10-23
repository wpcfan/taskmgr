import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskFilter } from '../../../domain';
import { TaskFilterVM, TaskFilterPriorityVM, TaskFilterOwnerVM } from '../../../vm';
import { getUpdateTaskFilterVMByOwner, getUpdateTaskFilterVMByPriority } from '../../../utils/task-filter.util';
import * as fromRoot from '../../../reducers';
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

  private taskFilterVM$: Observable<TaskFilterVM>;
  private descFilter$: Observable<string>;
  private _taskFilterVMSub: Subscription;
  private _descFilterSub: Subscription;

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      descFilter: ['']
    });

    this.taskFilterVM$ = this.store$.select(fromRoot.getTaskFilterVMState);
    this.descFilter$ = this.form.controls['descFilter'].valueChanges;
  }

  ngOnInit() {
    this._taskFilterVMSub = this.taskFilterVM$.subscribe((filterVM: TaskFilterVM) => {
      this.taskFilterVM = filterVM;
    })

    this._descFilterSub = this.descFilter$.debounceTime(300)
      .distinctUntilChanged()
      .subscribe((desc: string) => {
        this.taskDesc = desc.trim();
        this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction({ ...this.taskFilterVM, desc: this.taskDesc }));
      });
  }

  ngOnDestroy() {
    if (this._taskFilterVMSub) {
      this._taskFilterVMSub.unsubscribe();
    }

    if (this._descFilterSub) {
      this._descFilterSub.unsubscribe();
    }
  }

  getOwnerName(ownerVM: TaskFilterOwnerVM): string {
    return ownerVM.owner ? <string>ownerVM.owner.name : '待认领';
  }

  getOwnerAvatar(ownerVM: TaskFilterOwnerVM): string {
    return ownerVM.owner ? <string>ownerVM.owner.avatar : 'unassigned';
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  onClearDesc(ev: Event) {
    ev.preventDefault();
    this.form.controls['descFilter'].setValue('');
  }

  onOwnerItemClicked(ev: Event, ownerVM: TaskFilterOwnerVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByOwner(this.taskFilterVM, ownerVM)));
  }

  onPriorityItemClicked(ev: Event, priority: TaskFilterPriorityVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByPriority(this.taskFilterVM, priority)));
  }
}
