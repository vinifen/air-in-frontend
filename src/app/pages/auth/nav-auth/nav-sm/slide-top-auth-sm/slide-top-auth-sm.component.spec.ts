import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTopAuthSmComponent } from './slide-top-auth-sm.component';

describe('SlideTopAuthSmComponent', () => {
  let component: SlideTopAuthSmComponent;
  let fixture: ComponentFixture<SlideTopAuthSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideTopAuthSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideTopAuthSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
