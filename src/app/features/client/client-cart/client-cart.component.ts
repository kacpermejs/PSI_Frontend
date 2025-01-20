import {CommonModule, NgFor} from '@angular/common';
import {Component} from '@angular/core';
import {EventInfo} from '@core/models/EventInfo';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-client-cart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './client-cart.component.html',
  styleUrl: './client-cart.component.scss'
})
export class ClientCartComponent {
  cartItems: { event: EventInfo; quantity: number }[] = [];

  constructor() {
    this.cartItems = [
      {
        event: {
          id: 1,
          title: 'Music Concert',
          description: 'A night of amazing music.',
          eventStartDate: "11.02.2025",
          thumbnailUrl: 'https://via.placeholder.com/150'
        } as EventInfo, // Explicitly casting to EventInfo
        quantity: 2
      },
      {
        event: {
          id: 2,
          title: 'Art Exhibition',
          description: 'Explore stunning artworks.',
          eventStartDate: "11.02.2025",
          thumbnailUrl: 'https://via.placeholder.com/150'
        } as EventInfo, // Explicitly casting to EventInfo
        quantity: 1
      }
    ];
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity > 0) {
      this.cartItems[index].quantity = quantity;
    }
  }
}
