import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationRequestsPage } from './reservation-requests.page';

describe('ReservationRequestsPage', () => {
  let component: ReservationRequestsPage;
  let fixture: ComponentFixture<ReservationRequestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
