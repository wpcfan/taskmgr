import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectListComponent} from './project-list';
import {NewProjectComponent} from './new-project';
import {ProjectItemComponent} from './project-item';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  exports: [ProjectListComponent],
  entryComponents: [NewProjectComponent],
  declarations: [ProjectListComponent, NewProjectComponent, ProjectItemComponent]
})
export class ProjectModule {
}
