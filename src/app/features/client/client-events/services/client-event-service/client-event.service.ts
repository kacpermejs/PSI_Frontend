import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventPost } from '@core/models/events/EventPost';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientEventService {
  private http = inject(HttpClient);
  private apiUrl = '/api/event-service';

  constructor() {}

  getEventPosts(): Observable<EventPost[]> {
    return this.http.get<EventPost[]>(this.apiUrl + '/events');
  }
}
