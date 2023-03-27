import { TestBed } from '@angular/core/testing';

import { Pdr001Service } from './pdr001.service';

describe('Pdr001Service', () => {
  let service: Pdr001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pdr001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
