import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {MdIconRegistry, OverlayContainer} from '@angular/material';
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListHeaderComponent {
  @Output() changeListName = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() moveAllTasks = new EventEmitter<void>();
  @Output() newTask = new EventEmitter<void>();
  @Input() header = '';
  subTheme: Subscription;

  constructor(
    private store$: Store<fromRoot.State>,
    oc: OverlayContainer,
    iconRegistry: MdIconRegistry,
    sanitizer: DomSanitizer) {
    this.subTheme = this.store$.select(fromRoot.getTheme)
      .subscribe(result => oc.themeClass = result? 'myapp-dark-theme': null);
    iconRegistry.addSvgIcon(
        'move',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/move.svg'));
  }

  onChangeListName(ev: Event){
    ev.preventDefault();
    this.changeListName.emit();
  }

  onMoveAllTasks(ev: Event){
    ev.preventDefault();
    this.moveAllTasks.emit();
  }

  onDeleteList(ev: Event){
    ev.preventDefault();
    this.deleteList.emit();
  }

  addNewTask(ev: Event){
    ev.preventDefault();
    this.newTask.emit();
  }
}
