import { Component, OnInit, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as entities from '../../domain';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';
import { NewProjectComponent } from '../new-project';
import { ConfirmDialogComponent } from '../../shared'
import { flyInOut } from "../../anim";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [flyInOut],
  host: {'[@flyInOut]':''} // 绑定动画到宿主元素，即<app-project-item>
})
export class ProjectItemComponent implements OnInit {
  @Input('item') project: entities.Project;
  constructor(
    private dialog: MdDialog,
    private store$: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  openUpdateDialog(){
    this.dialog.open(NewProjectComponent, {data: {project: this.project}});
  }

  openInviteDialog(){

  }

  openDeleteDialog(){
    const confirm: entities.ConfirmDialog = {
      title: '删除项目：',
      content: '确认要删除该项目？',
      confirmAction: '确认删除'
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm}});
    dialogRef.afterClosed().subscribe(val => {
      if(val)
        this.store$.dispatch(new actions.DeleteProjectAction(this.project));
    })
  }
}
