import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskHistoryVM } from '../../../vm';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-task-history-dialog-item',
  templateUrl: './task-history-dialog-item.component.html',
  styleUrls: ['./task-history-dialog-item.component.scss']
})
export class TaskHistoryDialogItemComponent implements OnInit, OnDestroy {

  @Input() taskHistoryVM: TaskHistoryVM;
  @Output() itemClicked = new EventEmitter<void>();

  classItem: string = 'task-history-item';
  classItemAvatar: string = 'task-history-item-avatar';
  classItemContent: string = 'task-history-item-content';

  private theme$: Observable<boolean>;
  private _themeSub: Subscription;

  constructor(private store$: Store<fromRoot.State>) {
    this.theme$ = this.store$.select(fromRoot.getTheme);
  }

  ngOnInit() {
    this._themeSub = this.theme$.subscribe((dark: boolean) => {
      this.switchTheme(dark);
    })
  }

  ngOnDestroy() {
    if (this._themeSub) {
      this._themeSub.unsubscribe();
    }
  }

  switchTheme(dark: boolean) {
    if (!dark) {
      this.classItem = 'task-history-item';
      this.classItemAvatar = 'task-history-item-avatar';
      this.classItemContent = 'task-history-item-content';
    }
    else {
      this.classItem = 'task-history-item-dark';
      this.classItemAvatar = 'task-history-item-avatar-dark';
      this.classItemContent = 'task-history-item-content-dark';
    }
  }

  onItemClicked(ev: Event) {
    ev.preventDefault();
    this.itemClicked.emit();
  }
}
