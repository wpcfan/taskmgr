import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { 
    path: 'todos', 
    component: TodoComponent,
    canActivate: [ AuthGuardService ],
    canLoad: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }