import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers';
import { 
  MdToolbarModule, 
  MdToolbar 
} from '@angular/material';
import { HeaderComponent } from './header.component';

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
});
