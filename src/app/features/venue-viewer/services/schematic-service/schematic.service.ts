import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VenueSchematic } from '@core/models/venue-schematic/VenueSchematic';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchematicService {
  private http = inject(HttpClient);
  private apiUrl = '/api/event-service';

  constructor() { }

  getSchematicForEvent(id: number): Observable<VenueSchematic> {
      return this.http.get<VenueSchematic>(this.apiUrl + '/venue-schematic/' + id).pipe(
        tap(console.log)
      );
    }
}
