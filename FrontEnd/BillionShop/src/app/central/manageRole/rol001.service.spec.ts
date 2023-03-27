import { TestBed } from '@angular/core/testing';

import { Rol001Service } from './rol001.service';

describe('Rol001Service', () => {
  let service: Rol001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rol001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
