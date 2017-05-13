import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.scss']
})
export class TaskListHeaderComponent implements OnInit {
  showGrab: boolean = false;
  @Input() header = '';
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
        'hand-grab-o',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/hand-grab-o.svg'));
  }

  ngOnInit() {
  }
  onDragStart(e){
    console.log(e);
  }
  showGrabIndicator(show: boolean): void{
    this.showGrab = show;
  }
}
