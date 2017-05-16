import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { LoginComponent } from "./";
import { SharedModule } from '../../shared';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('测试登录组件：LoginComponent', ()=>{
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // async beforeEach
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        SharedModule,
        StoreModule.provideStore(reducer),
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
    expect(compiled.querySelector('.card md-card-header md-card-title').innerText).toContain('登录');
  });
})
