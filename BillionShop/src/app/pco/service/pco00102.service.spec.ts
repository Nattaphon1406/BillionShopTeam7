import { TestBed } from '@angular/core/testing';

import { Pco00102Service } from './pco00102.service';

describe('Pco00102Service', () => {
  let service: Pco00102Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pco00102Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
