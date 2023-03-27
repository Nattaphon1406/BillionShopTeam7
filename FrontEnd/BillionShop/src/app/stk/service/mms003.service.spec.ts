import { TestBed } from '@angular/core/testing';

import { Mms003Service } from './mms003.service';

describe('Mms003Service', () => {
  let service: Mms003Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mms003Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
