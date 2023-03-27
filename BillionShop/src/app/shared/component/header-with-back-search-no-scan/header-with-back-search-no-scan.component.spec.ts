import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderWithBackSearchNoScanComponent } from './header-with-back-search-no-scan.component';

describe('HeaderWithBackSearchNoScanComponent', () => {
  let component: HeaderWithBackSearchNoScanComponent;
  let fixture: ComponentFixture<HeaderWithBackSearchNoScanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderWithBackSearchNoScanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderWithBackSearchNoScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
