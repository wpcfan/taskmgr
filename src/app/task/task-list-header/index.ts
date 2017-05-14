import { 
  Component, 
  Output, 
  Input,
  EventEmitter 
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.scss']
})
export class TaskListHeaderComponent {
  showGrab: boolean = false;
  @Output() changeName = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();
  @Input() header = '';
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
        'hand-grab-o',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/hand-grab-o.svg'));
    iconRegistry.addSvgIcon(
        'move',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/move.svg'));
  }
  
  showGrabIndicator(show: boolean): void{
    this.showGrab = show;
  }
}
