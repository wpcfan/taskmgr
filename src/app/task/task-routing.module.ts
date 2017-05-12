import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from "./task-list";
import { AuthGuardService } from "../services";

const routes: Routes = [
  { 
    path: '', 
    component: TaskListComponent, 
    canLoad: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}