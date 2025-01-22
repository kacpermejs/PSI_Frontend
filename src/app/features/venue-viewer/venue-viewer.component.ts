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
import { SchematicMetadata } from '@core/models/venue-schematic/Metadata';
import { EventDetailsStoreService } from 'app/features/client/event-details-store/event-details-store.service';
import { Observable, of, switchMap, tap } from 'rxjs';
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
  route = inject(ActivatedRoute);
  eventStoreService = inject(EventDetailsStoreService);
  schematicService = inject(SchematicService);
  cdr = inject(ChangeDetectorRef);

  eventDetails$!: Observable<EventDetails | null>;
  loadingDetails$!: Observable<boolean>;
  errorDetails$!: Observable<string | null>;

  schematicData$!: Observable<VenueSchematic | null>;
  scale = 1;

  @ViewChild('viewer') viewer!: ElementRef<HTMLDivElement>;
  contentStyles: { [key: string]: string } = {};

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

    this.schematicData$.subscribe((data) => {
      if (data)
        this.calculateScaleAndPosition(data)
      this.cdr.detectChanges();
    });
  }

  getMetadataDisplay(metadata: SchematicMetadata[]): string {
    return metadata.map((m) => `${m.label} (${m.type})`).join(', ');
  }

  getStyles(
    object: SchematicObject,
    parent: { x: number; y: number }
  ): { [key: string]: string } {
    const x = parent.x + object.x;
    const y = parent.y + object.y;

    const isSeat = object.metadata.some((meta) => meta.type === 'seat');
    const isSection = object.metadata.some((meta) => meta.type === 'section');

    const width = isSeat ? '20px' : isSection ? '100px' : '50px';
    const height = isSeat ? '20px' : isSection ? '100px' : '50px';

    return {
      transform: `translate(${x}px, ${y}px)`,
      width,
      height,
      position: 'absolute',
      border: isSeat ? '2px solid red' : isSection ? '2px solid green' : '1px dashed blue',
      backgroundColor: isSeat ? '#FFD700' : isSection ? '#90EE90' : '#D3D3D3',
    };
  }

  private calculateScaleAndPosition(schematic: VenueSchematic): void {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    const traverse = (object: SchematicObject, parent: { x: number; y: number }) => {
      const x = parent.x + object.x;
      const y = parent.y + object.y;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);

      object.children.forEach((child) => traverse(child, { x, y }));
    };

    schematic.schematicObjects.forEach((object) => traverse(object, { x: 0, y: 0 }));

    // Calculate dimensions
    const width = maxX - minX;
    const height = maxY - minY;

    const viewerWidth = this.viewer.nativeElement.clientWidth || 800;
    const viewerHeight = this.viewer.nativeElement.clientHeight || 600;

    const scaleX = viewerWidth / width;
    const scaleY = viewerHeight / height;

    const scale = Math.min(scaleX, scaleY);

    const translateX = -minX * scale + (viewerWidth - width * scale) / 2;
    const translateY = -minY * scale + (viewerHeight - height * scale) / 2;

    // Apply calculated styles to schematic content
    this.contentStyles = {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      transformOrigin: 'top left',
      position: 'relative',
    };
  }

  ngOnDestroy(): void {}
}
