import { TestBed } from '@angular/core/testing';
import { Imt002Service } from './itm002.service';



describe('Reg001Service', () => {
  let service: Imt002Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Imt002Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
