import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDayComponent } from './previous-day.component';

describe('PreviousDayComponent', () => {
  let component: PreviousDayComponent;
  let fixture: ComponentFixture<PreviousDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
