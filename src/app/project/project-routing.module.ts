import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../services';
import {ProjectListComponent} from './project-list';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
