import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBottomAuthSmComponent } from './slide-bottom-auth-sm.component';

describe('SlideBottomAuthSmComponent', () => {
  let component: SlideBottomAuthSmComponent;
  let fixture: ComponentFixture<SlideBottomAuthSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideBottomAuthSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideBottomAuthSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
