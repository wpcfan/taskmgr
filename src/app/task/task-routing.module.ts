import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from "./task-list";

const routes: Routes = [
  { 
    path: '', 
    component: TaskListComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}