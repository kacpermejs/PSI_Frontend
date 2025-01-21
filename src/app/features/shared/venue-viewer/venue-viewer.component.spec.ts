import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueViewerComponent } from './venue-viewer.component';

describe('VenueViewerComponent', () => {
  let component: VenueViewerComponent;
  let fixture: ComponentFixture<VenueViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
