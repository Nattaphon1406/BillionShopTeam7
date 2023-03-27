import { TestBed } from '@angular/core/testing';

import { Mms002Service } from './mms002.service';

describe('Mms002Service', () => {
  let service: Mms002Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mms002Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
