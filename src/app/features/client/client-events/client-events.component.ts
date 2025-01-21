import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EventPost } from '@core/models/events/EventPost';
import { Observable } from 'rxjs';
import { ClientEventService } from './services/client-event-service/client-event.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-events',
  imports: [CommonModule, RouterModule],
  templateUrl: './client-events.component.html',
  styleUrl: './client-events.component.scss'
})
export class ClientEventsComponent {
  $events!: Observable<EventPost[]>;
  router = inject(Router);

  constructor(private eventsService: ClientEventService) {}

  ngOnInit(): void {
    // Assign the observable from the service
    this.$events = this.eventsService.getEventPosts();
  }

  goToEventDetail(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }

  // Navigate to booking page
  goToBooking(eventId: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the card click from being triggered
    this.router.navigate(['/booking', eventId, 'viewer']);
  }
}
