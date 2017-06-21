import {Component} from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _dark = false;

  constructor(private oc: OverlayContainer) {
  }

  get dark() {
    return this._dark;
  }

  switchDarkTheme(dark: boolean) {
    this._dark = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
  }
}
