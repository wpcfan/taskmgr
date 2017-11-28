import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {
  TaskFilterVM,
  TaskFilterItemVM,
  TaskFilterPriorityVM,
  TaskFilterOwnerVM
} from '../../../vm';
import {
  getSortVMLabel,
  getOwnerVMName,
  getOwnerVMAvatar,
  getCustomDateDesc,
  getDefaultCustomStartDate,
  getDefaultCustomEndDate,
  getUpdateTaskFilterVMBySort,
  getUpdateTaskFilterVMByOwner,
  getUpdateTaskFilterVMByDueDate,
  getUpdateTaskFilterVMByCreateDate,
  getUpdateTaskFilterVMByCustomCreateDate,
  getUpdateTaskFilterVMByPriority,
  getUpdateTaskFilterVMByCategory
} from '../../../utils/task-filter.util';
import * as fromRoot from '../../../reducers';
import * as TaskFilterActions from '../../../actions/task-filter.action';
import * as TaskFilterVMActions from '../../../actions/task-filter-vm.action';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit, OnDestroy {

  @ViewChild('startDatePicker') startDatePicker: MatDatepicker<Date>;
  @ViewChild('endDatePicker') endDatePicker: MatDatepicker<Date>;

  @Output() closeClicked = new EventEmitter<void>();

  classContainer: string = 'task-filter-nav-container';
  classTitle: string = 'task-filter-nav-title';
  classCategoryHeader: string = 'task-filter-nav-category-header';
  classCategoryHighlight: string = 'task-filter-nav-category-header-highlight';
  classCategoryDivider: string = 'task-filter-nav-category-divider';
  classCategoryItemContainer: string = 'task-filter-nav-category-item-container';
  classCategoryItem: string = 'task-filter-nav-category-item';
  classCategoryInputContainer: string = 'task-filter-nav-category-input-container';
  classMenuHeader: string = 'task-filter-nav-menu-header';
  classSortMenuItem: string = 'task-filter-nav-menu-item task-filter-nav-sort-menu-width';
  classEditMenuItem: string = 'task-filter-nav-menu-item task-filter-nav-edit-menu-width';


  form: FormGroup;
  taskFilterVM: TaskFilterVM;
  taskDesc: string;

  private taskFilterVM$: Observable<TaskFilterVM>;
  private _taskFilterVMSub: Subscription;

  private descFilter$: Observable<string>;
  private _descFilterSub: Subscription;

  private theme$: Observable<boolean>;
  private _themeSub: Subscription;

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      descFilter: [''],
      startCreateDate: [getDefaultCustomStartDate()],
      endCreateDate: [getDefaultCustomEndDate()]
    });

    this.taskFilterVM$ = this.store$.select(fromRoot.getTaskFilterVMState);
    this.descFilter$ = this.form.controls['descFilter'].valueChanges;
    this.theme$ = this.store$.select(fromRoot.getTheme);
  }

  ngOnInit() {
    this._taskFilterVMSub = this.taskFilterVM$.subscribe((filterVM: TaskFilterVM) => {
      this.taskFilterVM = filterVM;
    });

    this._descFilterSub = this.descFilter$.debounceTime(300)
      .distinctUntilChanged()
      .subscribe((desc: string) => {
        this.taskDesc = desc.trim();
        this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction({ ...this.taskFilterVM, desc: this.taskDesc }));
      });

    this._themeSub = this.theme$.subscribe((dark: boolean) => {
      this.switchTheme(dark);
    })
  }

  ngOnDestroy() {
    if (this._taskFilterVMSub) {
      this._taskFilterVMSub.unsubscribe();
    }

    if (this._descFilterSub) {
      this._descFilterSub.unsubscribe();
    }

    if (this._themeSub) {
      this._themeSub.unsubscribe();
    }
  }

  switchTheme(dark: boolean) {
    if (!dark) {
      this.classContainer = 'task-filter-nav-container';
      this.classTitle = 'task-filter-nav-title';
      this.classCategoryHeader = 'task-filter-nav-category-header';
      this.classCategoryHighlight = 'task-filter-nav-category-header-highlight';
      this.classCategoryDivider = 'task-filter-nav-category-divider';
      this.classCategoryItemContainer = 'task-filter-nav-category-item-container';
      this.classCategoryItem = 'task-filter-nav-category-item';
      this.classCategoryInputContainer = 'task-filter-nav-category-input-container';
      this.classMenuHeader = 'task-filter-nav-menu-header';
      this.classSortMenuItem = 'task-filter-nav-menu-item task-filter-nav-sort-menu-width';
      this.classEditMenuItem = 'task-filter-nav-menu-item task-filter-nav-edit-menu-width';
    }
    else {
      this.classContainer = 'task-filter-nav-container-dark';
      this.classTitle = 'task-filter-nav-title-dark';
      this.classCategoryHeader = 'task-filter-nav-category-header-dark';
      this.classCategoryHighlight = 'task-filter-nav-category-header-highlight-dark';
      this.classCategoryDivider = 'task-filter-nav-category-divider-dark';
      this.classCategoryItemContainer = 'task-filter-nav-category-item-container-dark';
      this.classCategoryItem = 'task-filter-nav-category-item-dark';
      this.classCategoryInputContainer = 'task-filter-nav-category-input-container-dark';
      this.classMenuHeader = 'task-filter-nav-menu-header-dark';
      this.classSortMenuItem = 'task-filter-nav-menu-item-dark task-filter-nav-sort-menu-width';
      this.classEditMenuItem = 'task-filter-nav-menu-item-dark task-filter-nav-edit-menu-width';
    }
  }

  getSortLabel(): string {
    return getSortVMLabel(this.taskFilterVM);
  }

  getOwnerName(ownerVM: TaskFilterOwnerVM): string {
    return getOwnerVMName(ownerVM);
  }

  getOwnerAvatar(ownerVM: TaskFilterOwnerVM): string {
    return getOwnerVMAvatar(ownerVM);
  }

  getStartCreateDateDesc(): string {
    return getCustomDateDesc(this.taskFilterVM.customCreateDate.startDate);
  }

  getEndCreateDateDesc(): string {
    return getCustomDateDesc(this.taskFilterVM.customCreateDate.endDate);
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  onClearDesc(ev: Event) {
    ev.preventDefault();
    this.form.controls['descFilter'].setValue('');
  }

  onSortItemClicked(ev: Event, sortVM: TaskFilterItemVM) {
    ev.preventDefault();
    ev.stopPropagation();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMBySort(this.taskFilterVM, sortVM)));
  }

  onSaveSortItemClicked(ev: Event) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterActions.UpdateTaskFilterAction(this.taskFilterVM));
  }

  onOwnerItemClicked(ev: Event, ownerVM: TaskFilterOwnerVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByOwner(this.taskFilterVM, ownerVM)));
  }

  onDueDateItemClicked(ev: Event, dueDate: TaskFilterItemVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByDueDate(this.taskFilterVM, dueDate)));
  }

  onCreateDateItemClicked(ev: Event, createDate: TaskFilterItemVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByCreateDate(this.taskFilterVM, createDate)));
  }

  onStartCreateDateClicked(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    this.startDatePicker.open();
  }

  onEndCreateDateClicked(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    this.endDatePicker.open();
  }

  onStartCreateDateChanged(date: Date) {
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByCustomCreateDate(this.taskFilterVM, date, true)));
  }

  onEndCreateDateChanged(date: Date) {
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByCustomCreateDate(this.taskFilterVM, date, false)));
  }

  onPriorityItemClicked(ev: Event, priority: TaskFilterPriorityVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByPriority(this.taskFilterVM, priority)));
  }

  onEditFilterHeaderClicked(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  onEditFilterCloseClicked(ev: Event) {
    ev.preventDefault();
  }

  onEditFilterItemClicked(ev: Event, category: TaskFilterItemVM) {
    ev.preventDefault();
    ev.stopPropagation();
    const updatedTaskFilterVM: TaskFilterVM = getUpdateTaskFilterVMByCategory(this.taskFilterVM, category);
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(updatedTaskFilterVM));
    this.store$.dispatch(new TaskFilterActions.UpdateTaskFilterAction(updatedTaskFilterVM));
  }
}
