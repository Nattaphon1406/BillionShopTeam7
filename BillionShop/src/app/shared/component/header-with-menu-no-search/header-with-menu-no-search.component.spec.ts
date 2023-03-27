import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderWithMenuNoSearchComponent } from './header-with-menu-no-search.component';

describe('HeaderWithMenuNoSearchComponent', () => {
  let component: HeaderWithMenuNoSearchComponent;
  let fixture: ComponentFixture<HeaderWithMenuNoSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderWithMenuNoSearchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderWithMenuNoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
