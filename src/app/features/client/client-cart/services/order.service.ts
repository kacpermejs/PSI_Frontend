import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderDTO } from '@core/models/order/OrderDTO';
import { CreateOrderResponse } from '../model/CreateOrderResponse';
import { MakePaymentDTO } from '../model/MakePaymentDTO';
import { MakePaymentResponse } from '../model/MakePaymentResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient)
  baseUrl = "/api/order-service"

  makePayment(payment: MakePaymentDTO) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<MakePaymentResponse>(this.baseUrl + '/makepayment', payment, { headers });

  }

  createOrder(order: OrderDTO) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CreateOrderResponse>(this.baseUrl + '/order/create', order, { headers })

  }
}
