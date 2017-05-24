import { browser, element, by } from 'protractor';

export class TaskMgrPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root md-sidenav-container')).getText();
  }
}
