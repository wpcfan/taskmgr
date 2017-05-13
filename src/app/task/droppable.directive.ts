import {
  Directive, 
  ElementRef, 
  HostListener, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit, 
  OnDestroy
} from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { DragDropService } from "./drag-drop.service";
import { Utils } from "./utils";

export class DropEvent {
  nativeEvent: any;
  dragData: any;

  constructor(event: any, data: any) {
    this.nativeEvent = event;
    this.dragData = data;
  }
}

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective implements OnInit, OnDestroy{

  /**
   *  Event fired when Drag dragged element enters a valid drop target.
   */
  @Output() onDragEnter: EventEmitter<any> = new EventEmitter();

  /**
   * Event fired when an element is being dragged over a valid drop target
   */
  @Output() onDragOver: EventEmitter<any> = new EventEmitter();

  /**
   * Event fired when a dragged element leaves a valid drop target.
   */
  @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

  /**
   * Event fired when an element is dropped on a valid drop target.
   */
  @Output() onDrop: EventEmitter<DropEvent> = new EventEmitter();

  /**
   * CSS class that is applied when a compatible draggable is being dragged over this droppable.
   */
  @Input() dragOverClass: string;

  /**
   * CSS class applied on this droppable when a compatible draggable item is being dragged.
   * This can be used to visually show allowed drop zones.
   */
  @Input() dragHintClass: string;

  /**
   * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
   */
  @Input() dropScope: string | Array<string> = 'default';

  /**
   * Defines if drop is enabled. `true` by default.
   */
  @Input() dropEnabled: boolean = true;

  /**
   * @private
   */
  dragStartSubscription: Subscription;
  
  /**
   * @private
   */
  dragEndSubscription: Subscription;

  constructor(protected el: ElementRef, private service: DragDropService) {}

  ngOnInit() {
    this.dragStartSubscription = this.service.onDragStart.subscribe(() => {
      if (this.allowDrop()) {
        Utils.addClass(this.el, this.dragHintClass);
      }
    });

    this.dragEndSubscription = this.service.onDragEnd.subscribe(() => {
      Utils.removeClass(this.el, this.dragHintClass);
    });
  }

  ngOnDestroy() {
    this.dragStartSubscription.unsubscribe();
    this.dragEndSubscription.unsubscribe();
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.onDragEnter.emit(e);
  }

  @HostListener('dragover', ['$event'])
  dragOver(e) {
    if (this.allowDrop()) {
      Utils.addClass(this.el, this.dragOverClass);
      e.preventDefault();
      this.onDragOver.emit(e);
    }
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(e) {
    Utils.removeClass(this.el, this.dragOverClass);
    e.preventDefault();
    this.onDragLeave.emit(e);
  }

  @HostListener('drop', ['$event'])
  drop(e) {
    Utils.removeClass(this.el, this.dragOverClass);
    e.preventDefault();
    e.stopPropagation();

    this.service.onDragEnd.next();
    this.onDrop.emit(new DropEvent(e, this.service.dragData));
  }

  allowDrop(): boolean {
    let allowed = false;

    if (typeof this.dropScope === "string") {
      if (typeof this.service.scope === "string")
        allowed = this.service.scope === this.dropScope;
      else if (this.service.scope instanceof Array)
        allowed = this.service.scope.indexOf(this.dropScope) > -1;
    }
    else if (this.dropScope instanceof Array) {
      if (typeof this.service.scope === "string")
        allowed = this.dropScope.indexOf(this.service.scope) > -1;
      else if (this.service.scope instanceof Array)
        allowed = this.dropScope.filter(
              item => this.service.scope.indexOf(item) !== -1).length > 0;
    }

    return allowed && this.dropEnabled;
  }
}
