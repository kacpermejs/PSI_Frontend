import { Injectable } from '@angular/core';
import { OrderData } from '@core/models/order/OrderData';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketStoreService {

  private selectedSeatsSubject = new BehaviorSubject<Map<number, OrderData>>(new Map());
  selectedSeats$ = this.selectedSeatsSubject.asObservable();

  toggleSelection(objId: number, data: OrderData) {
    const currentSeats = this.selectedSeatsSubject.getValue();
    if (currentSeats.has(objId)) {
      // If the seat is already selected, remove it
      this.removeSelectedTicket(objId);
    } else {
      // If the seat is not selected, add it
      this.addSelectedTicket(objId, data);
    }
  }

  isSelected(objId: number): boolean {
    return this.selectedSeatsSubject.getValue().has(objId);
  }

  addSelectedTicket(objId: number, data: OrderData) {
    const currentSeats = this.selectedSeatsSubject.getValue();
    currentSeats.set(objId, data);
    this.selectedSeatsSubject.next(new Map(currentSeats)); // Emit updated state
  }

  removeSelectedTicket(objId: number) {
    const currentSeats = this.selectedSeatsSubject.getValue();
    currentSeats.delete(objId);
    this.selectedSeatsSubject.next(new Map(currentSeats)); // Emit updated state
  }
}
