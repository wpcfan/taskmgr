import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import * as entities from '../../domain';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';
import {NewProjectComponent} from '../new-project';
import {ConfirmDialogComponent} from '../../shared';
import {foldAnim} from '../../anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [foldAnim],
})
export class ProjectItemComponent {
  @Input() item: entities.Project;
  @Output('itemSelected') itemSelected = new EventEmitter<void>();
  @HostBinding('@fold') fold;

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.fold = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target) {
    this.fold = 'out';
  }

  onClick(ev: Event) {
    ev.preventDefault();
    this.itemSelected.emit();
  }

  openUpdateDialog(ev: Event) {
    ev.preventDefault();
    this.dialog.open(NewProjectComponent, {data: {project: this.item}});
  }

  openInviteDialog(ev: Event) {
    ev.preventDefault();
  }

  openDeleteDialog(ev: Event) {
    ev.preventDefault();
    const confirm = {
      title: '删除项目：',
      content: '确认要删除该项目？',
      confirmAction: '确认删除'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm}});
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.store$.dispatch(new actions.DeleteProjectAction(this.item));
      }
    });
  }

  constructor(private dialog: MdDialog,
              private store$: Store<fromRoot.State>) {}
}
