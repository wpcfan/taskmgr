import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {
  @Input("itemCount") itemCount: number = 0;
  @Output("clearCompleted") clearEvent = new EventEmitter<void>();
  @Output("filterChange") filterEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.clearEvent.emit();
  }

  handleFilter(value){
    this.filterEvent.emit(value);
  }
}
