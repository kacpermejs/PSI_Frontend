import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {User} from '@core/models/User';
import {UserCustom} from '@core/models/UserCustom';
import {CognitoService} from '@core/services/cognito/cognito.service';
import {FormsModule} from '@angular/forms';
import {ControlService} from '@core/services/control/control.service';
import {UserRole} from '@core/models/UserRole';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User = {} as User;
  isLoggedIn: boolean = false;
  userName: string = '';
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService, private controlService: ControlService) {
    console.log("LOGIN constructor:");
  }

  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }

  private closeAlert() {
    this.showAlert = false;
  }

  signInWithCognito() {
    if (this.user && this.user?.email && this.user?.password) {

      this.cognitoService.handleSignIn(this.user).then((v) => {
        this.isLoggedIn = true;
        this.closeAlert();
        this.controlService.setAuthenticated(true);

        this.cognitoService.getAuthData()
          .then((v) => {
            if (v) {
              console.log("Just logged in...");
              this.userName = v.signInDetails.loginId;

              this.cognitoService.getUserData().then((data) => {
                if (data) {
                  console.log("Zapisywanie atrybutów usera");
                  const userProfile: UserCustom = {
                    email: data.email || '',
                    name: data.name || '',
                    family_name: data.family_name || '',
                    birthdate: data.birthdate || '',
                    phone_number: data.phone_number || '',
                    role: data['custom:role'] as UserRole || UserRole.Client,
                  };
                  console.log(userProfile);
                  localStorage.setItem('userProfile', JSON.stringify(userProfile));
                }
              })
              this.controlService.setUserName(this.userName);
              this.router.navigate(["/events"]);
              this.controlService.setLogin(false);
            } else {
              console.log("getAuthData()")
            }
          }).catch((error) => {
          console.log("cognitoService.getAuthData() failed");
          console.log(error);
        });
      })
        .catch((error) => {
          this.displayAlert(error.message);
        })
    } else {
      this.displayAlert("Missing user email or password");
    }
  }
}
