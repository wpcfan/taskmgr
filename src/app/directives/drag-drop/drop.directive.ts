import { Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';

@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]',
})
export class DropDirective {

  @Output() dropped: EventEmitter<DragData> = new EventEmitter();
  @Input() dropTags: string[] = [];
  @Input() dragEnterClass = '';

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService) {
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.service.getDragData().take(1).subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === event.target) {
      this.service.getDragData().take(1).subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === event.target) {
      this.service.getDragData().take(1).subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === event.target) {
      this.service.getDragData().take(1).subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
        }
      });
    }
  }

}
