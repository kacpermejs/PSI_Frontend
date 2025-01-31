import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetails } from '@core/models/events/EventDetails';
import { TicketMetadata } from '@core/models/venue-schematic/Metadata';
import { EventDetailsStoreService } from 'app/features/client/event-details-store/event-details-store.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { SchematicService } from './services/schematic-service/schematic.service';
import { VenueSchematic } from '@core/models/venue-schematic/VenueSchematic';
import { SchematicObject } from '@core/models/venue-schematic/SchematicObject';

@Component({
  selector: 'app-venue-viewer',
  imports: [CommonModule],
  templateUrl: './venue-viewer.component.html',
  styleUrl: './venue-viewer.component.scss',
})
export class VenueViewerComponent implements OnInit, OnDestroy {
  @ViewChild('viewer') viewer!: ElementRef;
  route = inject(ActivatedRoute);
  eventStoreService = inject(EventDetailsStoreService);
  schematicService = inject(SchematicService);
  cdr = inject(ChangeDetectorRef);

  eventDetails$!: Observable<EventDetails | null>;
  loadingDetails$!: Observable<boolean>;
  errorDetails$!: Observable<string | null>;

  schematicData$!: Observable<VenueSchematic | null>;
  simplifiedData$!: Observable<SchematicObject[] | null>;

  selectedSeats: Set<number> = new Set();

  originX: number = 0; // Origin X offset (relative to center)
  originY: number = 0; // Origin Y offset (relative to center)
  viewerWidth: number = 0; // Viewer width
  viewerHeight: number = 0;

  isDragging: boolean = false; // Track dragging state
  startDragX: number = 0; // Initial mouse X position during drag
  startDragY: number = 0; // Initial mouse Y position during drag
  initialOriginX: number = 0; // Initial origin X before drag
  initialOriginY: number = 0;
  
  zoomLevel: number = 1;
  maxZoomLevel = 100;
  minZoomLevel = 0.2
  zoomInFactor = 1.1;
  zoomOutFactor = 0.9;

  constructor() {}

  ngOnInit(): void {
    // Observe loading and error states
    this.loadingDetails$ = this.eventStoreService.getLoadingState();
    this.errorDetails$ = this.eventStoreService.getErrorState();

    // Get event ID from route and fetch details
    this.eventDetails$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        const numericId = id !== null ? parseInt(id) : null;

        console.log('requesting with ' + numericId);

        // If ID is valid, request the details, otherwise return null
        return numericId !== null
          ? this.eventStoreService.getEventDetails(numericId)
          : new Observable<EventDetails | null>((observer) =>
              observer.next(null)
            );
      })
    );

    this.schematicData$ = this.eventDetails$.pipe(
      switchMap( (eventDetails) => {
        if (eventDetails) {
          return this.schematicService.getEmptySchematic(
            eventDetails.venueSchematic.id
          );
        } else {
          return of(null)
        }
      })
    )

    this.eventDetails$.subscribe(() => {
      this.cdr.detectChanges();
    });

    this.simplifiedData$ = this.schematicData$.pipe(
      map(data => data ? data.schematicObjects.filter(obj => obj.metadata?.[0]?.type === 'section') : null)
    );
  }

  ngAfterViewInit() {
    // Calculate viewer dimensions and set initial origin
    const viewerBounds = this.viewer.nativeElement.getBoundingClientRect();
    this.viewerWidth = viewerBounds.width;
    this.viewerHeight = viewerBounds.height;

    // Center the origin
    this.originX = this.viewerWidth / 2;
    this.originY = this.viewerHeight / 2;

    this.cdr.detectChanges();
  }

  mouseMoved(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.startDragX;
      const deltaY = event.clientY - this.startDragY;

      this.originX = this.initialOriginX + deltaX;
      this.originY = this.initialOriginY + deltaY;
    }
  }

  startMouseDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startDragX = event.clientX;
    this.startDragY = event.clientY;
    this.initialOriginX = this.originX;
    this.initialOriginY = this.originY;
  }

  endMouseDrag() {
    this.isDragging = false;
  }

  zoomIn() {
    if (this.zoomLevel < this.maxZoomLevel) {
      this.zoomLevel *= this.zoomInFactor;  // Multiply to zoom in (increase zoom level by 10%)
      this.updateZoom();      // Update zoom after multiplying
    }
  }
  
  zoomOut() {
    if (this.zoomLevel > this.minZoomLevel) {
      this.zoomLevel *= this.zoomOutFactor;  // Multiply to zoom out (decrease zoom level by 10%)
      this.updateZoom();      // Update zoom after multiplying
    }
  }

  // Mouse wheel event for zoom
  onZoom(event: WheelEvent) {
    event.preventDefault();  // Prevent default scroll behavior

    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  updateZoom(event: WheelEvent | null = null) {
    // Calculate zoom change direction based on the event delta
    let zoomDelta = event ? (event.deltaY < 0 ? 0.1 : -0.1) : 0;
  
    // Apply the zoom delta (zoom in or out)
    const newZoomLevel = this.zoomLevel + zoomDelta;
  
    if (newZoomLevel >= 0.5 && newZoomLevel <= 2) {
      this.zoomLevel = newZoomLevel;
  
      // Adjust the origin only if there's a zoom event (on mousewheel)
      if (event) {
        // Calculate where the mouse position is relative to the center
        const mouseX = event.clientX - this.viewer.nativeElement.offsetLeft;
        const mouseY = event.clientY - this.viewer.nativeElement.offsetTop;
  
        // Adjust the origin offset to maintain zoom focus on mouse position
        const zoomFactor = 1 + zoomDelta;
        this.originX = mouseX - (mouseX - this.originX) * zoomFactor;
        this.originY = mouseY - (mouseY - this.originY) * zoomFactor;
      }
    }
  }

  toggleSeatSelection(seatId: number) {
    if (this.selectedSeats.has(seatId)) {
      this.selectedSeats.delete(seatId);
    } else {
      this.selectedSeats.add(seatId);
    }
  }

  isSelected(seatId: number): boolean {
    return this.selectedSeats.has(seatId);
  }

  isAvailable(seat: SchematicObject): boolean {
    return seat.metadata.some(
      (d) => d.type === 'ticket' && (d as TicketMetadata).available
    );
  }

  ngOnDestroy(): void {}
}
