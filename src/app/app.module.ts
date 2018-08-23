import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { LoginModule } from './login';
import { AppComponent } from './core/containers/app';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'taskmgr' }),
    TransferHttpCacheModule,
    SharedModule,
    LoginModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
