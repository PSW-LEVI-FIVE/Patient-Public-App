import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedAppointmentsComponent } from './finished-appointments.component';

describe('FinishedAppointmentsComponent', () => {
  let component: FinishedAppointmentsComponent;
  let fixture: ComponentFixture<FinishedAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
