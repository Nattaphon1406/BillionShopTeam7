import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { itmModal } from './itmModal.component';

describe('Itm002Component', () => {
  let component: itmModal;
  let fixture: ComponentFixture<itmModal>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [itmModal],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(itmModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
