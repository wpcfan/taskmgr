import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../services/auth.service';
import { authReducer } from '../reducers/auth.reducer';
import { AuthEffects } from '../effects/auth.effects';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    EffectsModule.run(AuthEffects),
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
    FooterComponent],
  providers: [
    AuthGuardService,
    AuthService,
    {
      provide: 'BASE_URI',
      useValue: 'http://localhost:3000'
    }
    ],
  declarations: [HeaderComponent, FooterComponent]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}