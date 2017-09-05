import {NgModule, Optional, SkipSelf, LOCALE_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdIconRegistry, DateAdapter, MD_DATE_FORMATS, MdDatepickerIntl} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedModule} from '../shared';
import {AppRoutingModule} from './app-routing.module';
import {AppEffectsModule} from '../effects';
import {ServicesModule} from '../services';
import {AppStoreModule} from '../reducers';

import {HeaderComponent} from './header';
import {FooterComponent} from './footer';
import {SidebarComponent} from './sidebar';
import {PageNotFoundComponent} from './page-not-found';

import {loadSvgResources} from '../utils/svg.util';
import {DateFnsAdapter} from '../shared/adapters/date-fns-adapter';
import {DatepickerI18n} from '../shared/adapters/datepicker-i18n';
import { MD_FNS_DATE_FORMATS } from '../shared/adapters/date-formats';

import '../utils/debug.util';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    HttpClientModule,
    AppEffectsModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
  ],
  providers: [
    {provide: 'BASE_CONFIG', useValue: { uri: 'http://localhost:3002'}},
    {provide: LOCALE_ID, useValue: 'zh-CN'},
    {provide: DateAdapter, useClass: DateFnsAdapter},
    {provide: MD_DATE_FORMATS, useValue: MD_FNS_DATE_FORMATS},
    {provide: MdDatepickerIntl, useClass: DatepickerI18n},
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
