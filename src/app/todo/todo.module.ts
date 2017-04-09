import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoComponent } from './todo/todo.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  imports: [
    SharedModule,
    TodoRoutingModule
  ],
  exports: [TodoComponent],
  declarations: [
    TodoComponent, 
    TodoHeaderComponent, 
    TodoFooterComponent, 
    TodoItemComponent, 
    TodoListComponent
    ]
})
export class TodoModule { }
