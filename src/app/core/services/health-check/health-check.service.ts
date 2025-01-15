import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  http = inject(HttpClient)

  constructor() { }

  checkHealth(): Observable<any> {
    return this.http.get('/api/event-service/health', {responseType: 'json'})
  }
}
