import { Injectable } from '@angular/core';
import { OrderData } from '@core/models/order/OrderData';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketStoreService {
  private readonly localStorageKey = 'selectedSeats'; // Key for localStorage
  private selectedSeatsSubject = new BehaviorSubject<Map<number, OrderData>>(this.getStoredSeats());
  selectedSeats$ = this.selectedSeatsSubject.asObservable();

  constructor() {
    // Load stored seats from localStorage when the service is initialized
    this.selectedSeatsSubject.next(this.getStoredSeats());
  }

  toggleSelection(objId: number, data: OrderData) {
    const currentSeats = this.selectedSeatsSubject.getValue();
    if (currentSeats.has(objId)) {
      this.removeSelectedTicket(objId);
    } else {
      this.addSelectedTicket(objId, data);
    }
  }

  isSelected(objId: number): boolean {
    return this.selectedSeatsSubject.getValue().has(objId);
  }

  addSelectedTicket(objId: number, data: OrderData) {
    const currentSeats = this.selectedSeatsSubject.getValue();
    currentSeats.set(objId, data);
    this.updateState(currentSeats);
  }

  removeSelectedTicket(objId: number) {
    const currentSeats = this.selectedSeatsSubject.getValue();
    currentSeats.delete(objId);
    this.updateState(currentSeats);
  }

  private updateState(updatedSeats: Map<number, OrderData>) {
    // Update the BehaviorSubject
    this.selectedSeatsSubject.next(new Map(updatedSeats));
    // Save the updated state to localStorage
    this.saveSeatsToStorage(updatedSeats);
  }

  private saveSeatsToStorage(seats: Map<number, OrderData>) {
    // Convert the Map to an array of key-value pairs and store it in localStorage
    const serializedSeats = JSON.stringify(Array.from(seats.entries()));
    localStorage.setItem(this.localStorageKey, serializedSeats);
  }

  private getStoredSeats(): Map<number, OrderData> {
    // Retrieve the stored seats from localStorage
    const storedSeats = localStorage.getItem(this.localStorageKey);
    if (storedSeats) {
      // Convert the array of key-value pairs back to a Map
      return new Map(JSON.parse(storedSeats));
    }
    // Return an empty Map if no seats are stored
    return new Map();
  }

  clearSelectedSeats() {
    // Clear the selected seats and remove them from localStorage
    this.selectedSeatsSubject.next(new Map());
    localStorage.removeItem(this.localStorageKey);
  }
}