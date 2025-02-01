import { Component, inject, OnInit } from '@angular/core';
import { TicketCartComponent } from '../ticket-cart/ticket-cart.component';
import { TicketStoreService } from '../../services/ticket-store/ticket-store.service';
import { OrderData } from '@core/models/order/OrderData';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, TicketCartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  ticketStore = inject(TicketStoreService);
  tickets$?: Observable<OrderData[]>
  
  ngOnInit(): void {
    this.tickets$ = this.ticketStore.selectedSeats$.pipe(
      map(m => Array.from(m.values()))
    );
  }

  //TODO
  handleCash() {
    let data = this.getOrderData();
    throw new Error('Method not implemented.');
  }
  handleBlik() {
    let data = this.getOrderData();
    throw new Error('Method not implemented.');
  }
  handleOnlinePaymentPlatform() {
    let data = this.getOrderData();
    throw new Error('Method not implemented.');
  }

  summary(order: OrderData[]) {
    let sumPrice = 0;

    order.forEach(t => {
      sumPrice += t.ticket.price;
    })

    return sumPrice;
  }

  currency(order: OrderData[]) {
    //TODO: we need this in ticket database
    return "PLN";
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
