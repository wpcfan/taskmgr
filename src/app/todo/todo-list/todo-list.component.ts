import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as entities from '../../domain';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  _todos: entities.Todo[] = [];
  @Output("remove") removeEvent = new EventEmitter<entities.Todo>();
  @Output("toggle") toggleEvent = new EventEmitter<entities.Todo>();
  constructor() { }
  get todos(){
    return this._todos;
  }
  @Input() 
  set todos(value){
    if(value !== undefined || value.length ===0)
      this._todos = value;
  }
  handleToggle(item: entities.Todo){
    this.toggleEvent.emit(item);
  }
  handleRemove(item: entities.Todo){
    this.removeEvent.emit(item);
  }
}
