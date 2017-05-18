import { 
  Component, 
  Output, 
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListHeaderComponent {
  @Output() changeListName = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() addListAfter = new EventEmitter<void>();
  @Output() copyAllTasks = new EventEmitter<void>();
  @Output() moveAllTasks = new EventEmitter<void>();
  @Input() header = '';
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
        'hand-grab-o',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/hand-grab-o.svg'));
    iconRegistry.addSvgIcon(
        'move',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/move.svg'));
  }

  onChangeListName(ev: Event){
    ev.preventDefault();
    this.changeListName.emit();
  }

  onAddListAfter(ev: Event){
    ev.preventDefault();
    this.addListAfter.emit();
  }

  onCopyAllTasks(ev: Event){
    ev.preventDefault();
    this.copyAllTasks.emit();
  }

  onMoveAllTasks(ev: Event){
    ev.preventDefault();
    this.moveAllTasks.emit();
  }

  onDeleteList(ev: Event){
    ev.preventDefault();
    this.deleteList.emit();
  }
}
