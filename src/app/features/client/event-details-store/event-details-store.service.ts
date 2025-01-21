import { inject, Injectable } from '@angular/core';
import { EventDetails } from '@core/models/events/EventDetails';
import { BehaviorSubject, catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsStoreService {
  private http = inject(HttpClient);
  private apiUrl = '/api/event-service';

  private eventDetailsSubject = new Map<number, Observable<EventDetails | null>>(); // Cache of observables
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null); // Subject for errors

  constructor() {}

  /**
   * Gets the event details from the store or fetches from the API if not cached.
   * @param eventId - ID of the event to retrieve.
   * @returns Observable<EventDetails>
   */
  getEventDetails(eventId: number): Observable<EventDetails | null> {
    // If event details are already cached, return the cached observable
    if (this.eventDetailsSubject.has(eventId)) {
      return this.eventDetailsSubject.get(eventId)!; // Return cached observable
    }

    // Fetch from the API and store the observable in the cache
    this.loadingSubject.next(true);
    
    const eventDetails$ = this.fetchEventDetails(eventId).pipe(
      tap((eventDetails) => {
        this.loadingSubject.next(false);
        this.errorSubject.next(null); // Clear any previous errors
      }),
      catchError((error) => {
        this.loadingSubject.next(false);
        this.errorSubject.next('Failed to load event details');
        return of(null); // Return null if an error occurs
      }),
      shareReplay(1) // Share the result across multiple subscribers
    );

    // Cache the observable
    this.eventDetailsSubject.set(eventId, eventDetails$);

    return eventDetails$;
  }

  /**
   * Returns an observable for the loading state.
   * @returns Observable<boolean>
   */
  getLoadingState(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  /**
   * Returns an observable for error messages.
   * @returns Observable<string | null>
   */
  getErrorState(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }

  /**
   * Clears the cached data (optional utility).
   */
  clearCache(): void {
    this.eventDetailsSubject.clear();
  }

  fetchEventDetails(id: number): Observable<EventDetails> {

    return this.http.get<EventDetails>(this.apiUrl + '/events/' + id).pipe(
      tap(console.log)
    );
  }

}
