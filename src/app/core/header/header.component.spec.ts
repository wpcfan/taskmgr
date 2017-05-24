import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers';
import {
  MdToolbarModule,
} from '@angular/material';
import { HeaderComponent } from './';

describe('测试顶部组件：HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        StoreModule.provideStore(reducer),
        MdToolbarModule
      ]
    })
    .compileComponents();
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
