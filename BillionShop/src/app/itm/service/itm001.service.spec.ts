import { TestBed } from '@angular/core/testing';

import { Itm001Service } from './itm001.service';

describe('Itm001Service', () => {
  let service: Itm001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Itm001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
