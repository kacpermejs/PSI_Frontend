import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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

  // Method to toggle the mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

