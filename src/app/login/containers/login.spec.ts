import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login';
import {SharedModule} from '../../shared';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers, initState} from '../../reducers';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('测试登录组件：LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        StoreModule.forRoot(reducers, {initialState: initState, metaReducers: metaReducers }),
        BrowserAnimationsModule
      ]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('组件模板的元素应该被正确创建', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-header mat-card-title').innerText).toContain('登录');
  });
});
