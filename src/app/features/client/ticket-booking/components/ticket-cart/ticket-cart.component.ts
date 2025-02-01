import { Component, inject, OnInit } from '@angular/core';
import { TicketStoreService } from '../../services/ticket-store/ticket-store.service';
import { map, Observable } from 'rxjs';
import { OrderData } from '@core/models/order/OrderData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-cart',
  imports: [CommonModule],
  templateUrl: './ticket-cart.component.html',
  styleUrl: './ticket-cart.component.scss'
})
export class TicketCartComponent implements OnInit {
  orderStoreService = inject(TicketStoreService);

  tickets$?: Observable<Map<number, OrderData>>;

  ngOnInit(): void {
    this.tickets$ = this.orderStoreService.selectedSeats$;
  }

  removeTicket(objId: number) {
    this.orderStoreService.removeSelectedTicket(objId);
  }

  trackByTicketId(index: number, ticket: { key: number, value: OrderData }): number {
    return ticket.key;
  }
}
