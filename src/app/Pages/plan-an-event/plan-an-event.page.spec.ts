import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanAnEventPage } from './plan-an-event.page';

describe('PlanAnEventPage', () => {
  let component: PlanAnEventPage;
  let fixture: ComponentFixture<PlanAnEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlanAnEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
