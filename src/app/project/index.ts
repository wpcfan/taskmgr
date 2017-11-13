import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectListComponent} from './containers/project-list';
import {InviteComponent} from './components/invite';
import {ProjectItemComponent} from './components/project-item';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  exports: [ProjectListComponent],
  entryComponents: [InviteComponent],
  declarations: [
    ProjectListComponent,
    InviteComponent,
    ProjectItemComponent
    ]
})
export class ProjectModule {
}
