import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderDTO } from '@core/models/order/OrderDTO';
import {MakePaymentDTO} from '../model/MakePaymentDTO';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient)
  baseUrl = "/api/order-service"

  makePayment(payment: MakePaymentDTO) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.baseUrl + '/makepayment', payment, { headers }).subscribe(
      console.log //TODO navigate to success page or show error
    );

  }
}
