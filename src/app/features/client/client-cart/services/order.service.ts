import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderDTO } from '@core/models/order/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient)
  baseUrl = "/api/order-service"

  createOrder(order: OrderDTO) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.baseUrl + '/order/create', order, { headers }).subscribe(
      console.log //TODO navigate to success page or show error
    );

  }
}
