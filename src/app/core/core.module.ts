import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './auth-guard.service';
import { authReducer } from '../reducers/auth.reducer';
import { MaterialModule, MdSidenav, MdSidenavContainer } from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.provideStore({
      auth: authReducer
    }),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  exports: [
    HeaderComponent,
    MdSidenav,
    MdSidenavContainer],
  providers: [AuthGuardService],
  declarations: [HeaderComponent]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}