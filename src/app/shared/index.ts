import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  MdToolbarModule,
  MdSidenavModule,
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
  MdTooltipModule,
  MdSelectionModule,
  MdSlideToggleModule,
  MdSidenav,
  MdSidenavContainer,
} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog';
import {ImageListSelectComponent} from './image-list-select';
import {ChipsListComponent} from './chips-list';
import {IdentityInputComponent} from './identity-input';
import {AreaListComponent} from './area-list';
import {AgeInputComponent} from './age-input';
import {DirectivesModule} from '../directives';

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
    MdTooltipModule,
    MdToolbarModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSelectionModule,
    DirectivesModule,
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
    MdTooltipModule,
    MdSelectionModule,
    MdToolbarModule,
    MdSidenavModule,
    MdSlideToggleModule,
    DirectivesModule,
    ConfirmDialogComponent,
    ImageListSelectComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
    AgeInputComponent,
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
    AgeInputComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule {
}

export {ConfirmDialogComponent}
