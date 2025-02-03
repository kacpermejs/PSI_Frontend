import { Component, inject, OnInit } from '@angular/core';
import { TicketCartComponent } from "../ticket-cart/ticket-cart.component";
import { VenueViewerComponent } from 'app/features/venue-viewer/venue-viewer.component';
import { OrderData } from '@core/models/order/OrderData';
import { TicketStoreService } from '../../services/ticket-store/ticket-store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'app/features/client/client-cart/services/order.service';
import { CognitoService } from '@core/services/cognito/cognito.service';
import { OrderTicketDTO } from '@core/models/order/OrderTicketDTO';

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

  orderService = inject(OrderService);
  ticketStore = inject(TicketStoreService);
  cognito = inject(CognitoService);

  ngOnInit(): void {
    this.tickets$ = this.orderStoreService.selectedSeats$;
  }

  navigateToCheckout() {
    const data = this.getOrderData();

    this.cognito.getUserData().then(user => {
      const tickets = data.map(d => {
        return {
          id: d.ticket.id,
          price: d.ticket.price
        } as OrderTicketDTO;
      })

      console.log(user);
      
  
      this.orderService.createOrder({
        tickets: tickets,
        username: user.sub //FIXME: this should be handled by token processing
      }).subscribe({
        next: () => {
          this.router.navigate(['/cart']);
        },
        error: (e) => {
          console.error(e);
        }
      });
    })  
    

  }

  private getOrderData(): OrderData[] {
    const orderData = Array.from(this.ticketStore.getSnapshot().values());
  
    if (orderData.length === 0) {
      throw new Error('No order data found. The array is empty.');
    }
    
    console.log(orderData);
    return orderData;
  }
}
