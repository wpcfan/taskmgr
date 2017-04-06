import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, Auth } from '../../domain/entities.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  auth$: Observable<Auth>;

  @Output("toggle") clickHandler: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store$: Store<AppState>) { 
    this.auth$ = this.store$.select(appState => appState.auth);
  }

  onClick(){
    this.clickHandler.emit();
  }
}
