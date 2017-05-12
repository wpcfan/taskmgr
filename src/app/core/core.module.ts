import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MdSidenavModule, 
  MdToolbarModule, 
  MdSidenavContainer, 
  MdSidenav, 
  MdToolbar 
} from '@angular/material';
import { SharedModule } from "../shared";
import { AppEffectsModule } from "../effects";
import { ServicesModule } from '../services';
import { AppRoutingModule } from "../app-routing.module";
import { AppStoreModule } from '../reducers/app-store.module';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import 'hammerjs';

@NgModule({
  imports: [
    HttpModule,
    MdSidenavModule,
    MdToolbarModule,
    SharedModule,
    AppRoutingModule,
    AppEffectsModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    BrowserAnimationsModule
  ],
  exports: [
    AppRoutingModule,
    MdSidenavContainer,
    MdSidenav,
    MdToolbar,
    HeaderComponent,
    FooterComponent],
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
    FooterComponent]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}