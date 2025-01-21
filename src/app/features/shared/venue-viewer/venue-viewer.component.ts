import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetails } from '@core/models/events/EventDetails';
import { EventDetailsStoreService } from 'app/features/client/event-details-store/event-details-store.service';
import { Observable, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-venue-viewer',
  imports: [CommonModule],
  templateUrl: './venue-viewer.component.html',
  styleUrl: './venue-viewer.component.scss',
})
export class VenueViewerComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute)
    eventStoreService = inject(EventDetailsStoreService)
    cdr = inject(ChangeDetectorRef)
  
    eventDetails$!: Observable<EventDetails | null>;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;
  
    constructor() {}
  
    ngOnInit(): void {
      // Observe loading and error states
      this.loading$ = this.eventStoreService.getLoadingState();
      this.error$ = this.eventStoreService.getErrorState();
  
      console.log("Oninit");
      
      // Get event ID from route and fetch details
      this.eventDetails$ = this.route.paramMap.pipe(
        switchMap((params) => {
          const id = params.get('id');
          const numericId = id !== null ? parseInt(id) : null;
  
          console.log('requesting with ' + numericId);
          
          // If ID is valid, request the details, otherwise return null
          return numericId !== null
            ? this.eventStoreService.getEventDetails(numericId)
            : new Observable<EventDetails | null>((observer) => observer.next(null));
        })
      );
  
      this.eventDetails$.subscribe(() => {
        this.cdr.detectChanges();
      });
    }

  ngOnDestroy(): void {}
}
