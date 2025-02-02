import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlService} from '@core/services/control/control.service';
import {UserCustom} from '@core/models/UserCustom';
import {UserRole} from '@core/models/UserRole';
import { CognitoService } from '@core/services/cognito/cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styles: []
})
export class AccountComponent implements OnInit {
  user: UserCustom = {
    email: '',
    name: '',
    family_name: '',
    birthdate: '',
    phone_number: '',
    role: UserRole.Guest
  };
  role: string = ''

  public UserRole = UserRole;
  
  cognitoService = inject(CognitoService);
  router = inject(Router);

  constructor(private controlService: ControlService) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        this.user = JSON.parse(storedProfile) as UserCustom;
        this.role = this.user.role.toString();
      } catch (error) {
        console.error('Error parsing local storage user profile:', error);
      }
    }
  }

  async logOut(): Promise<void> {
    try {
      await this.cognitoService.signOut();
      this.router.navigate(["/"]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}
