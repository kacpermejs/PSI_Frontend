import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { OrderData } from '@core/models/order/OrderData';
import { OrderTicketDTO } from '@core/models/order/OrderTicketDTO';
import { CognitoService } from '@core/services/cognito/cognito.service';
import { Observable, map } from 'rxjs';
import { OrderService } from './services/order.service';
import { TicketStoreService } from '../ticket-booking/services/ticket-store/ticket-store.service';
import { TicketCartComponent } from '../ticket-booking/components/ticket-cart/ticket-cart.component';

@Component({
  selector: 'app-client-cart',
  imports: [CommonModule, TicketCartComponent],
  templateUrl: './client-cart.component.html',
  styleUrl: './client-cart.component.scss'
})
export class ClientCartComponent implements OnInit {
  ticketStore = inject(TicketStoreService);
  tickets$?: Observable<OrderData[]>

  orderService = inject(OrderService)
  cognito = inject(CognitoService)
  
  ngOnInit(): void {
    this.tickets$ = this.ticketStore.selectedSeats$.pipe(
      map(m => Array.from(m.values()))
    );
  }

  handleCash() {
    let data = this.getOrderData();

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
      });
    })
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

