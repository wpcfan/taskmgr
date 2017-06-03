import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry, OverlayContainer} from '@angular/material';

@Component({
  selector: 'app-task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListHeaderComponent implements OnInit {
  @Output() changeListName = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() moveAllTasks = new EventEmitter<void>();
  @Output() newTask = new EventEmitter<void>();
  @Input() header = '';
  @Input() darkTheme: boolean = false;

  constructor(private oc: OverlayContainer,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'move',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/move.svg'));
  }

  ngOnInit() {
    this.oc.themeClass = this.darkTheme ? 'myapp-dark-theme' : null;
  }

  onChangeListName(ev: Event) {
    ev.preventDefault();
    this.changeListName.emit();
  }

  onMoveAllTasks(ev: Event) {
    ev.preventDefault();
    this.moveAllTasks.emit();
  }

  onDeleteList(ev: Event) {
    ev.preventDefault();
    this.deleteList.emit();
  }

  addNewTask(ev: Event) {
    ev.preventDefault();
    this.newTask.emit();
  }
}
