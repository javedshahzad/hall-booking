import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenueSpacesPage } from './venue-spaces.page';

describe('VenueSpacesPage', () => {
  let component: VenueSpacesPage;
  let fixture: ComponentFixture<VenueSpacesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VenueSpacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
