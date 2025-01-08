import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAuthLgComponent } from './slide-auth-lg.component';

describe('SlideAuthLgComponent', () => {
  let component: SlideAuthLgComponent;
  let fixture: ComponentFixture<SlideAuthLgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideAuthLgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideAuthLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
