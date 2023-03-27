import { TestBed } from '@angular/core/testing';

import { ItmChooseListService } from './itm-choose-list.service';

describe('ItmChooseListService', () => {
  let service: ItmChooseListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItmChooseListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
