import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageListSelectComponent } from './image-list-select.component';

describe('ImageListSelectComponent', () => {
  let component: ImageListSelectComponent;
  let fixture: ComponentFixture<ImageListSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageListSelectComponent ]
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
