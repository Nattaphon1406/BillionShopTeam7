import { TestBed } from '@angular/core/testing';

import { Reg001Service } from './reg001.service';

describe('Reg001Service', () => {
  let service: Reg001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reg001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
