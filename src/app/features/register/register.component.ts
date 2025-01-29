import {Component, OnInit} from '@angular/core';
import {User} from '@core/models/User';
import {Router} from '@angular/router';
import {CognitoService} from '@core/services/cognito/cognito.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ControlService} from '@core/services/control/control.service';
import {UserRole} from '@core/models/UserRole';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public UserRole = UserRole;
  user: User = {} as User;
  isConfirmed: boolean = false; // dopoki nie zakonczy sie proces rejestracji, widoczne będzie okno
  confirmRegistration: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService, private controlService: ControlService) {
    console.log("REGISTER constructor:");
  }

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirmed = false;
  }

  public signUpWithCognito() {
    console.log(this.user);

    if (this.user && this.user.email && this.user.password) {
      this.cognitoService.handleSignUp(this.user).then(() => {
        this.isConfirmed = true;

        this.closeAlert();
        this.confirmRegistration = true;

      }).catch((error: any) => {
        this.displayAlert(error.message);
      })
    } else {
      this.displayAlert("Missing user email or password")
    }
  }

  private displayAlert(message: string) {
    console.log(message)
    this.alertMessage = message;
    this.showAlert = true;
  }

  private closeAlert() {
    this.showAlert = false;
  }

  public confirmSignUp() {
    if (this.user) {
      this.cognitoService.handleConfirmSignUp(this.user)
        .then(() => {

          this.confirmRegistration = false;
          //raczej zbędne ale nie chce mi sie sprawdzac
          this.isConfirmed = true;
          this.closeAlert();
          this.goToLogin();

        })
        .catch((error: any) => {
          this.displayAlert(error.message)
        })
    } else {
      this.displayAlert("Missing user infomation")
      this.closeAlert();
    }
  }

  public goToLogin() {
    this.controlService.setRegister(false);
    this.controlService.setLogin(true);
    this.router.navigate(['/login']);
  }
}
