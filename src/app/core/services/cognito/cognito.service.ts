import {Injectable} from '@angular/core';
import {Amplify} from 'aws-amplify';
import {
  signUp,
  confirmSignUp,
  signIn,
  fetchAuthSession,
  getCurrentUser,
  signOut,
  fetchUserAttributes
} from 'aws-amplify/auth';
import {User} from '../../models/User'
import {BehaviorSubject, Observable, map, catchError, of} from 'rxjs';
import {ControlService} from '../control/control.service';
import {environment} from '../../../../environments/environment'
import {UserRole} from '@core/models/UserRole';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(private controlService: ControlService) {
    console.log(environment.Cognito);

    Amplify.configure({
      Auth: {
        Cognito: environment.Cognito
      }
    });

    console.log("\nCOGNITO SERVICE-----------------------");
    console.log(environment.Cognito);
    console.log("\nCOGNITO SERVICE-----------------------");
    console.log(environment);
    console.log("ENVENVENVENVENV");

  }

  public handleSignUp(user: User): Promise<any> {
    return signUp({
      username: user.email,
      password: user.password,
      options: {
        userAttributes: {
          email: user.email,
          name: user.name,
          family_name: user.family_name,
          birthdate: user.birthdate,
          phone_number: user.phone_number,
          'custom:role': UserRole[user.role]
        },
      }
    })
  }

  public handleConfirmSignUp(user: User): Promise<any> {
    return confirmSignUp({
      confirmationCode: user.code,
      username: user.email
    });
  }

  public async handleSignIn(user: User): Promise<any> {
    try {
      // check if there's an existing session
      const currentSession = await fetchAuthSession();

      if (currentSession?.tokens) {
        // User is already signed in, sign them out first
        // moze jeszcze clear local storage
        await signOut();
      }

      return await signIn({
        password: user.password,
        username: user.email
      });
    } catch (error) {
      throw error;
    }
  }

  public getAuthData(): Promise<any> {
    console.log("get Auth Data.............")
    return getCurrentUser();
  }

  public getUserData(): Promise<any> {
    console.log("get User Data.............")
    return fetchUserAttributes();
  }

  public handleAuthDate(): void {

    console.log("handle Auth Data.............")

    fetchAuthSession().then(data => {
      //console.log(data.tokens?.accessToken.toString());
      console.log(" data from token ");
      console.log(data);

      const accessToken = data.tokens?.accessToken.toString();
      if (accessToken) {
        console.log("Access Token: ", accessToken);
        this.controlService.setJWTToken(accessToken);
      }
    });
    return;
  }
}
