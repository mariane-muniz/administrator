import { TestBed } from '@angular/core/testing';

import { DataTestService } from './data-test.service';

describe('DataTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTestService = TestBed.get(DataTestService);
    expect(service).toBeTruthy();
  });
});
