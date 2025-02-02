import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NavbarConfig, ROLE_NAVBAR_CONFIG} from './models/role-navbar-config';
import {ControlService} from '@core/services/control/control.service';
import {Observable} from 'rxjs';
import {CognitoService} from '@core/services/cognito/cognito.service';
import {UserRole} from '@core/models/UserRole';

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
  menuItems: NavbarConfig[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor(private controlService: ControlService,
              private router: Router,
              private cognitoService: CognitoService) {
    this.isLoggedIn$ = this.controlService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.controlService.getRole().subscribe(userRole => {
      //todo jakoś dziwnie ten enum działa
      if (typeof userRole !== "number") {
        switch (userRole) {
          case "Client":
            userRole = UserRole.Client;
            break;
          case "Manager":
            userRole = UserRole.Manager;
            break;
          case "Employee":
            userRole = UserRole.Employee;
            break;
          case "Guest":
            userRole = UserRole.Guest;
            break;
          default:
            userRole = UserRole.Guest;
        }
      }
      this.menuItems = ROLE_NAVBAR_CONFIG[userRole] || ROLE_NAVBAR_CONFIG[UserRole.Guest];
    });
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

