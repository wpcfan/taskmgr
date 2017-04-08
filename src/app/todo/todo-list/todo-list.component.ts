import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../domain/entities.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  _items: Todo[] = [];
  @Output("remove") removeEvent = new EventEmitter<Todo>();
  @Output("toggle") toggleEvent = new EventEmitter<Todo>();
  constructor() { }
  @Input("items")
  set items(items:Todo[]){
    if(items !== undefined)
      this._items = [...items];
  }
  get items() {
    return this._items;
  }
  handleToggle(item: Todo){
    this.toggleEvent.emit(item);
  }
  handleRemove(item: Todo){
    this.removeEvent.emit(item);
  }
}
