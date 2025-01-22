import { Routes } from "@angular/router";
import { VenueViewerComponent } from "app/features/venue-viewer/venue-viewer.component";

export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./ticket-booking.component').then((m) => m.TicketBookingComponent),
    children: [
      {
        path: 'viewer',
        component: VenueViewerComponent
      }
    ]
  }
]