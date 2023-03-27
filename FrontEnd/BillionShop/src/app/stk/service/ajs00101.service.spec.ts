import { TestBed } from '@angular/core/testing';

import { Ajs00101Service } from './ajs00101.service';

describe('Ajs00101Service', () => {
  let service: Ajs00101Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ajs00101Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
