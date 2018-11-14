import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotBookedComponent } from './slot-booked.component';

describe('SlotBookedComponent', () => {
  let component: SlotBookedComponent;
  let fixture: ComponentFixture<SlotBookedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotBookedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
