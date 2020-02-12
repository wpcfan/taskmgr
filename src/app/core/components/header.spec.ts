import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { reducers, metaReducers } from '../../reducers';
import { HeaderComponent } from './header';

describe('测试顶部组件：HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers: metaReducers }),
        MatIconModule,
        MatToolbarModule,
        MatSlideToggleModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('组件应该被创建', () => {
    expect(component).toBeTruthy();
  });

  it('组件模板的元素应该被正确创建', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').innerText).toContain('企业协作平台');
  });
});
