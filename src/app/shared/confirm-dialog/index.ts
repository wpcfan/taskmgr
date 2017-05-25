import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';

export interface ConfirmDialog {
  title: string;
  content: string;
  confirmAction: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnDestroy {

  dialog: ConfirmDialog;
  subTheme: Subscription;

  constructor(private oc: OverlayContainer,
              private store$: Store<fromRoot.State>,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<ConfirmDialogComponent>) {
    this.subTheme = this.store$.select(fromRoot.getTheme)
      .subscribe(result => oc.themeClass = result ? 'myapp-dark-theme' : null);
    if (this.data.dialog !== undefined || this.data.dialog !== null) {
      this.dialog = this.data.dialog;
    }
  }

  ngOnDestroy() {
    if (this.subTheme) {
      this.subTheme.unsubscribe();
    }
  }

  handleAction(result: boolean) {
    this.dialogRef.close(result);
  }
}
