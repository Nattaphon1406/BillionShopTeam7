import { TestBed } from '@angular/core/testing';

import { Rcv00101Service } from './rcv00101.service';

describe('Rcv00101Service', () => {
  let service: Rcv00101Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rcv00101Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
