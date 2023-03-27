import { TestBed } from '@angular/core/testing';

import { Mms001Service } from './mms001.service';

describe('Mms001Service', () => {
  let service: Mms001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mms001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
