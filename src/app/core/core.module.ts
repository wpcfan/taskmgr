import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MdSidenavModule, 
  MdToolbarModule, 
  MdSidenavContainer, 
  MdSidenav, 
  MdToolbar 
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { services } from '../services';
import { reducer } from '../reducers';
import { effects } from '../effects';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdToolbarModule,
    EffectsModule.run(effects.auth),
    EffectsModule.run(effects.todos),
    EffectsModule.run(effects.quote),
    EffectsModule.run(effects.projects),
   /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  exports: [
    MdSidenavContainer,
    MdSidenav,
    MdToolbar,
    HeaderComponent,
    FooterComponent],
  providers: [
    services.auth_guard,
    services.auth,
    services.todo,
    services.quote,
    services.project,
    {
      provide: 'BASE_URI',
      useValue: 'http://localhost:3000'
    }],
  declarations: [
    HeaderComponent, 
    FooterComponent]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}