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
  MdSlideToggleModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ConfirmDialogComponent} from './confirm-dialog';
import {ImageListSelectComponent} from './image-list-select';
import {ChipsListComponent} from './chips-list';
import {IdentityInputComponent} from './identity-input';
import {AreaListComponent} from './area-list';
import {AgeInputComponent} from './age-input';
import {DirectivesModule} from '../directives';

const MATERIAL_MODULES = [
  MdToolbarModule, MdSidenavModule, MdAutocompleteModule, MdButtonModule,
  MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule,
  MdDatepickerModule, MdDialogModule, MdGridListModule, MdIconModule,
  MdInputModule, MdListModule, MdMenuModule, MdNativeDateModule,
  MdProgressBarModule, MdRadioModule, MdSelectModule, MdTabsModule,
  MdTooltipModule, MdSlideToggleModule,
];

const MODULES = [
  ...MATERIAL_MODULES,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  FlexLayoutModule,
  DirectivesModule
];

const DECLARATIONS = [
  ConfirmDialogComponent,
  ImageListSelectComponent,
  ChipsListComponent,
  IdentityInputComponent,
  AreaListComponent,
  AgeInputComponent,
];

const EXPORT_COMPONENTS = [
  ConfirmDialogComponent,
  ImageListSelectComponent,
  ChipsListComponent,
  IdentityInputComponent,
  AreaListComponent,
  AgeInputComponent,
];

@NgModule({
  imports: MODULES,
  exports: [
    ...MODULES,
    ...EXPORT_COMPONENTS
  ],
  declarations: DECLARATIONS,
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule {
}

export {ConfirmDialogComponent}
