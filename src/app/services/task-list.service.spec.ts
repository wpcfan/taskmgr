import { TestBed, inject } from '@angular/core/testing';

import { TaskListService } from './task-list.service';

describe('TaskListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskListService]
    });
  });

  it('should ...', inject([TaskListService], (service: TaskListService) => {
    expect(service).toBeTruthy();
  }));
});
