// account.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlService } from '@core/services/control/control.service';
import { UserCustom } from '@core/models/UserCustom';
import { UserRole } from '@core/models/UserRole';  // assuming you need this for the default role

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
    role: UserRole.Client
  };

  public UserRole = UserRole;

  constructor(private controlService: ControlService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        this.user = JSON.parse(storedProfile) as UserCustom;
        console.log("User odczytany z local storage:");
        console.log(this.user);

      } catch (error) {
        console.error('Error parsing stored user profile:', error);
      }
    }
  }
}
