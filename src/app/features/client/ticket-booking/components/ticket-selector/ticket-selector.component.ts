import { Component, inject } from '@angular/core';
import { TicketCartComponent } from "../ticket-cart/ticket-cart.component";
import { VenueViewerComponent } from 'app/features/venue-viewer/venue-viewer.component';
import { OrderData } from '@core/models/order/OrderData';
import { TicketStoreService } from '../../services/ticket-store/ticket-store.service';

@Component({
  selector: 'app-ticket-selector',
  imports: [VenueViewerComponent, TicketCartComponent],
  templateUrl: './ticket-selector.component.html',
  styleUrl: './ticket-selector.component.scss'
})
export class TicketSelectorComponent {

}
