import { TestBed } from '@angular/core/testing';

import { Rcv004Service } from './rcv004.service';

describe('Rcv004Service', () => {
  let service: Rcv004Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rcv004Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
