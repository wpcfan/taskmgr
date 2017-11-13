import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ConfirmDialogComponent} from './components/confirm-dialog';
import {ImageListSelectComponent} from './components/image-list-select';
import {ChipsListComponent} from './components/chips-list';
import {IdentityInputComponent} from './components/identity-input';
import {AreaListComponent} from './components/area-list';
import {AgeInputComponent} from './components/age-input';
import {NewProjectComponent} from '../project/components/new-project';
import {DirectivesModule} from '../directives';

const MATERIAL_MODULES = [
  MatToolbarModule, MatSidenavModule, MatAutocompleteModule, MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
  MatProgressBarModule, MatRadioModule, MatSelectModule, MatTabsModule,
  MatTooltipModule, MatSlideToggleModule,
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
  NewProjectComponent,
];

const EXPORT_COMPONENTS = [
  ConfirmDialogComponent,
  ImageListSelectComponent,
  ChipsListComponent,
  IdentityInputComponent,
  AreaListComponent,
  AgeInputComponent,
  NewProjectComponent,
];

@NgModule({
  imports: MODULES,
  exports: [
    ...MODULES,
    ...EXPORT_COMPONENTS
  ],
  declarations: DECLARATIONS,
  entryComponents: [
    ConfirmDialogComponent,
    NewProjectComponent
  ]
})
export class SharedModule {
}

export {ConfirmDialogComponent}
