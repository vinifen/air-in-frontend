import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaTestAccountComponent } from './sca-test-account.component';

describe('ScaTestAccountComponent', () => {
  let component: ScaTestAccountComponent;
  let fixture: ComponentFixture<ScaTestAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaTestAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScaTestAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
