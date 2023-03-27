import { TestBed } from '@angular/core/testing';

import { rcv002Service } from './rcv002.service';

describe('Rcv002Service', () => {
  let service: rcv002Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(rcv002Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
