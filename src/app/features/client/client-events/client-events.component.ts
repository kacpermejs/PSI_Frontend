import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventInfo } from '@core/models/EventInfo';
import { Observable } from 'rxjs';
import { ClientEventService } from './services/client-event-service/client-event.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-events',
  imports: [CommonModule, RouterModule],
  templateUrl: './client-events.component.html',
  styleUrl: './client-events.component.scss'
})
export class ClientEventsComponent {
  $events!: Observable<EventInfo[]>;

  constructor(private eventsService: ClientEventService) {}

  ngOnInit(): void {
    // Assign the observable from the service
    this.$events = this.eventsService.getEventPosts();
  }
}
