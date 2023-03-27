import { TestBed } from '@angular/core/testing';

import { Rcv001Service } from './rcv001.service';

describe('Rcv001Service', () => {
  let service: Rcv001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rcv001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
