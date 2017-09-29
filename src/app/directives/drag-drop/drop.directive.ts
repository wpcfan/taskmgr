import {Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2} from '@angular/core';
import {DragDropService, DragData} from '../drag-drop.service';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[appDroppable][dropTags][dragEnterClass]',
})
export class DropDirective {

  @Output() dropped: EventEmitter<DragData> = new EventEmitter();
  @Input() dropTags: string[] = [];
  @Input() dragEnterClass = '';
  private drag$: Observable<DragData | null>;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService) {
      this.drag$ = this.service.getDragData().take(1);
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.drag$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData!.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
          this.rd.setProperty(this.el.nativeElement, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(this.el.nativeElement, 'dataTransfer.dropEffect', 'move');
        }
      });
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.drag$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData!.tag) > -1) {
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
    if (this.el.nativeElement === ev.target) {
      this.drag$.subscribe(dragData => {
        if (this.dropTags.indexOf(<string>dragData!.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.drag$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData!.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData!);
          this.service.clearDragData();
        }
      });
    }
  }

}
