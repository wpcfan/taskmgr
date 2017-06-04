import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdSidenav,
  MdSidenavContainer,
  MdToolbarModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdButtonModule,
  MdIconModule,
  MdListModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {AppEffectsModule} from '../effects';
import {ServicesModule} from '../services';
import {AppStoreModule} from '../reducers';
import {HeaderComponent} from './header';
import {FooterComponent} from './footer';
import {SidebarComponent} from './sidebar';
import {PageNotFoundComponent} from './page-not-found';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from '../utils/svg.util';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdToolbarModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    AppEffectsModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    MdSidenav,
    MdSidenavContainer,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000',
      }
    }
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    iconRegistry: MdIconRegistry,
    sanitizer: DomSanitizer) {
    if (parentModule) {
      throw new Error('CoreModule 已经装载，请仅在 AppModule 中引入该模块。');
    }
    loadSvgResources(iconRegistry, sanitizer);
  }
}
