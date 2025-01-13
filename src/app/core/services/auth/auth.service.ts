import { Injectable } from '@angular/core';
import { UserRole } from '@core/models/UserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getRole() {
    return UserRole.Client; //TODO: From Cognito
  }
}
