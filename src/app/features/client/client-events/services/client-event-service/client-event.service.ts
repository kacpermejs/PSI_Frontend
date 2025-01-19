import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventInfo } from '@core/models/EventInfo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientEventService {
  private http = inject(HttpClient);
  private apiUrl = '/api/event-service/event-posts';

  constructor() {}

  getEventPosts(): Observable<EventInfo[]> {
    return this.http.get<EventInfo[]>(this.apiUrl);
  }
}
