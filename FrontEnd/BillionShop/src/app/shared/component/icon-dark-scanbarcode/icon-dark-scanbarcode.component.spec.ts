import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IconDarkScanbarcodeComponent } from './icon-dark-scanbarcode.component';

describe('IconDarkScanbarcodeComponent', () => {
  let component: IconDarkScanbarcodeComponent;
  let fixture: ComponentFixture<IconDarkScanbarcodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IconDarkScanbarcodeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IconDarkScanbarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
