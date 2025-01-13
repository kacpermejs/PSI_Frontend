import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROLE_NAVBAR_CONFIG } from './models/role-navbar-config';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isMenuOpen = false;
  menuItems: { label: string; route: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    this.menuItems = ROLE_NAVBAR_CONFIG[userRole] || [];
  }
  
  // Method to toggle the mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

