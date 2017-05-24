import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dark: boolean = false;
  switchDarkTheme(dark: boolean): void{
    this.dark = dark;
  }
}
