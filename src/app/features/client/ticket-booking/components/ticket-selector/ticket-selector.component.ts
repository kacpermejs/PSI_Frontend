import { Component, inject, OnInit } from '@angular/core';
import { TicketCartComponent } from "../ticket-cart/ticket-cart.component";
import { VenueViewerComponent } from 'app/features/venue-viewer/venue-viewer.component';
import { OrderData } from '@core/models/order/OrderData';
import { TicketStoreService } from '../../services/ticket-store/ticket-store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-selector',
  imports: [CommonModule, VenueViewerComponent, TicketCartComponent],
  templateUrl: './ticket-selector.component.html',
  styleUrl: './ticket-selector.component.scss'
})
export class TicketSelectorComponent implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  
  orderStoreService = inject(TicketStoreService);
  tickets$?: Observable<Map<number, OrderData>>;

  ngOnInit(): void {
    this.tickets$ = this.orderStoreService.selectedSeats$;
  }

  navigateToCheckout() {
    this.router.navigate(['/cart']);
  }
}
