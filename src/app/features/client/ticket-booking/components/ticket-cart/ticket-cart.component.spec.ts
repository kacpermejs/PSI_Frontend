import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCartComponent } from './ticket-cart.component';

describe('TicketCartComponent', () => {
  let component: TicketCartComponent;
  let fixture: ComponentFixture<TicketCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
