import { TestBed } from '@angular/core/testing';

import { Ajs001Service } from './ajs001.service';

describe('Ajs001Service', () => {
  let service: Ajs001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ajs001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
