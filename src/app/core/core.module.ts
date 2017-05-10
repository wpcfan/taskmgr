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
import { AppEffectsModule } from "../effects";
import { ServicesModule } from '../services';
import { AppStoreModule } from '../reducers/app-store.module';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule,
    MdSidenavModule,
    MdToolbarModule,
    AppStoreModule,
    AppEffectsModule,
  ],
  exports: [
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