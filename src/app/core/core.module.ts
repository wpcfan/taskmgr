import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';
import { QuoteService } from '../services/quote.service';
import { reducer } from '../reducers';
import { AuthEffects } from '../effects/auth.effects';
import { TodoEffects } from '../effects/todo.effects';
import { QuoteEffects } from '../effects/quote.effects';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    EffectsModule.run(AuthEffects),
    EffectsModule.run(TodoEffects),
    EffectsModule.run(QuoteEffects),
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
    HeaderComponent,
    FooterComponent],
  providers: [
    AuthGuardService,
    AuthService,
    TodoService,
    QuoteService,
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