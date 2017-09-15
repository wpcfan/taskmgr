import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdGridListModule, MdIconModule} from '@angular/material';
import {ImageListSelectComponent} from './';

describe('ImageListSelectComponent', () => {
  let component: ImageListSelectComponent;
  let fixture: ComponentFixture<ImageListSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageListSelectComponent],
      imports: [MdGridListModule, MdIconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
