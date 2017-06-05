import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdProgressBarModule,
  MdRadioModule,
  MdSelectModule,
  MdTabsModule,
  MdSelectionModule,
} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog';
import {ImageListSelectComponent} from './image-list-select';
import {ChipsListComponent} from './chips-list';
import {IdentityInputComponent} from './identity-input';
import {AreaListComponent} from './area-list';
import {AgeInputComponent} from './age-input';
import {InitialsPipe} from './initials.pipe';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdInputModule,
    MdSelectModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    MdGridListModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdProgressBarModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdAutocompleteModule,
    MdTabsModule,
    MdSelectionModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdInputModule,
    MdSelectModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    MdGridListModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdProgressBarModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdAutocompleteModule,
    MdTabsModule,
    MdSelectionModule,
    ConfirmDialogComponent,
    ImageListSelectComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
    AgeInputComponent,
    DragDirective,
    DropDirective,
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
    AgeInputComponent,
    InitialsPipe,
    DragDirective,
    DropDirective
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule {
}

export {ConfirmDialogComponent}
