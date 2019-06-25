import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../services';
import {PageNotFoundComponent} from './containers/page-not-found';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    loadChildren: () => import('app/project').then(m => m.ProjectModule),
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'tasklists/:id',
    loadChildren: () => import('app/task').then(m => m.TaskModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'mycal/:view',
    loadChildren: () => import('app/my-calendar').then(m => m.MyCalendarModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
