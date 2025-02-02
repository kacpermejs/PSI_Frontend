import { Routes } from "@angular/router";
import { TicketSelectorComponent } from "./components/ticket-selector/ticket-selector.component";

export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./ticket-booking.component').then((m) => m.TicketBookingComponent),
    children: [
      {
        path: 'viewer',
        component: TicketSelectorComponent
      }
    ]
  }
]