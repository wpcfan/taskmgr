import { browser, by, element } from 'protractor';

export class TaskmgrPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root mat-sidenav-container')).getText();
  }

  fillInfo() {
    element(by.id('md-input-0')).sendKeys('dev');
    element(by.id('md-input-1')).sendKeys('dev');
    element(by.buttonText('登录')).click();
    return browser.takeScreenshot();
  }

}
