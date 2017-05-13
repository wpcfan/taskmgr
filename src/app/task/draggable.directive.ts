import { 
  Directive, 
  ElementRef, 
  HostListener, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';
import { DragDropService } from "./drag-drop.service";
import { Utils } from "./utils";

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  /**
   * The data that will be avaliable to the droppable directive on its `onDrop()` event.
   */
  @Input() dragData;

  /**
   * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element.
   */
  @Input() dragHandle: string;

  /**
   * Currently not used
   */
  @Input() dragEffect = 'move';

  /**
   * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
   */
  @Input() dragScope: string | Array<string> = 'default';

  /**
   * CSS class applied on the draggable that is applied when the item is being dragged.
   */
  @Input() dragOverClass: string;

  /**
   * The url to image that will be used as custom drag image when the draggable is being dragged. 
   */
  @Input() dragImage: string;

  /**
   * Defines if drag is enabled. `true` by default.
   */
  @Input() dragEnabled: boolean = true;

  /**
   * Event fired when Drag is started
   */
  @Output() onDragStart: EventEmitter<any> = new EventEmitter();

  /**
   * Event fired while the element is being dragged
   */
  @Output() onDrag: EventEmitter<any> = new EventEmitter();

  /**
   * Event fired when drag ends
   */
  @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

  /**
   * @private
   * Keeps track of mouse over element that is used to determine drag handles
   */
  mouseOverElement: any;


  constructor(protected el: ElementRef, private service: DragDropService) {
    
  }

  @HostListener('dragstart', ['$event'])
  dragStart(e) {
    // if (this.allowDrag()) {
      Utils.addClass(this.el, this.dragOverClass);

      this.service.dragData = this.dragData;
      this.service.scope = this.dragScope;

      // Firefox requires setData() to be called otherwise the drag does not work.
      // We don't use setData() to transfer data anymore so this is just a dummy call.
      if (e.dataTransfer != null)
        e.dataTransfer.setData('text', '');

      // Set dragImage
      if (this.dragImage) {
        let img: HTMLImageElement = document.createElement("img");
        img.src = this.dragImage;
        e.dataTransfer.setDragImage(img, 0, 0);
      }

      e.stopPropagation();
      this.onDragStart.emit(e);
      this.service.onDragStart.next();
    // }
    // else {
    //   e.preventDefault();
    // }
  }

  @HostListener('drag', ['$event'])
  drag(e) {
    this.onDrag.emit(e)
  }

  @HostListener('dragend', ['$event'])
  dragEnd(e) {
    Utils.removeClass(this.el, this.dragOverClass);
    this.service.onDragEnd.next();
    this.onDragEnd.emit(e);
    e.stopPropagation();
    e.preventDefault();
  }

  @HostListener('mouseenter', ['$event'])
  mouseover(e) {
    this.mouseOverElement = e.target;
  }

  private allowDrag() {
    return this.dragHandle ? 
      Utils.matches(this.mouseOverElement, this.dragHandle) && this.dragEnabled : 
      this.dragEnabled;
  }

}
