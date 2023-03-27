import { TestBed } from '@angular/core/testing';

import { Pco00101Service } from './pco00101.service';

describe('Pco00101Service', () => {
  let service: Pco00101Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pco00101Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
