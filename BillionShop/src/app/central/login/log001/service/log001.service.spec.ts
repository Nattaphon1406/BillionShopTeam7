import { TestBed } from '@angular/core/testing';

import { Log001Service } from './log001.service';

describe('Log001Service', () => {
  let service: Log001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Log001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
