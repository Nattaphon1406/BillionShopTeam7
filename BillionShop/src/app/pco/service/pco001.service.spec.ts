import { TestBed } from '@angular/core/testing';

import { Pco001Service } from './pco001.service';

describe('Pco001Service', () => {
  let service: Pco001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pco001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
