import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "./services";
import { PageNotFoundComponent } from "./page-not-found";

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full' 
  },
  {
    path: 'tasklists/:id',
    loadChildren: 'app/task/task.module#TaskModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }