import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrecinctMapPage } from './precinct-map.page';

describe('PrecinctMapPage', () => {
  let component: PrecinctMapPage;
  let fixture: ComponentFixture<PrecinctMapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrecinctMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
