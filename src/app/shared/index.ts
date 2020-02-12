import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './components/confirm-dialog';
import { ImageListSelectComponent } from './components/image-list-select';
import { ChipsListComponent } from './components/chips-list';
import { IdentityInputComponent } from './components/identity-input';
import { AreaListComponent } from './components/area-list';
import { AgeInputComponent } from './components/age-input';
import { DirectivesModule } from '../directives';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIAL_MODULES = [
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
  MatSlideToggleModule
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
  AgeInputComponent
];

const EXPORT_COMPONENTS = [
  ConfirmDialogComponent,
  ImageListSelectComponent,
  ChipsListComponent,
  IdentityInputComponent,
  AreaListComponent,
  AgeInputComponent
];

@NgModule({
  imports: MODULES,
  exports: [...MODULES, ...EXPORT_COMPONENTS],
  declarations: DECLARATIONS,
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}

export { ConfirmDialogComponent };
