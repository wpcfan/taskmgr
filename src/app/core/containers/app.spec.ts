import {async, TestBed} from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material';
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../';
import {AppComponent} from './app';

describe('测试根模块：AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule, RouterModule.forRoot([]), CoreModule],
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }]
    }).compileComponents();
  }));

  it('应该创建应用', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('应该包含一个 .site 的元素', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.site')).toBeTruthy();
  }));
});
