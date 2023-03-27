import { TestBed } from '@angular/core/testing';

import { Ajs00102Service } from './ajs00102.service';

describe('Ajs00102Service', () => {
  let service: Ajs00102Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ajs00102Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
