import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDaysComponent } from './all-days.component';

describe('AllDaysComponent', () => {
  let component: AllDaysComponent;
  let fixture: ComponentFixture<AllDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
