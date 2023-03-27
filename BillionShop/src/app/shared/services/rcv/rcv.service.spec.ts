import { TestBed } from '@angular/core/testing';

import { RcvService } from './rcv.service';

describe('RcvService', () => {
  let service: RcvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
