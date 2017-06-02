import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectListComponent} from './project-list';
import {NewProjectComponent} from './new-project';
import {InviteComponent} from './invite';
import {ProjectItemComponent} from './project-item';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  exports: [ProjectListComponent],
  entryComponents: [NewProjectComponent, InviteComponent],
  declarations: [
    ProjectListComponent,
    NewProjectComponent,
    InviteComponent,
    ProjectItemComponent
    ]
})
export class ProjectModule {
}
