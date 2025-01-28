import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRole} from '@core/models/UserRole';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor() {
    console.log("Control service constructor")
  }

  private toLogin = new BehaviorSubject<boolean>(false);
  private toRegister = new BehaviorSubject<boolean>(false);
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>("");
  private role = new BehaviorSubject<UserRole>(UserRole.Client);
  private jwtAccessToken = new BehaviorSubject<string>("");
  private topicSubscription = new BehaviorSubject<string>("");

  nowLogin(): Observable<boolean> {
    return this.toLogin.asObservable()
  }

  nowRegister(): Observable<boolean> {
    return this.toRegister.asObservable()
  }

  nowAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable()
  }

  nowAuth(): Observable<string> {
    return this.userName.asObservable();
  }

  getToken(): Observable<string> {
    return this.jwtAccessToken.asObservable();
  }

  nowTopic(): Observable<string> {
    return this.topicSubscription.asObservable()
  }


  // -------------------------------------

  setLogin(bool: boolean) {
    this.toLogin.next(bool);
  }

  setRegister(bool: boolean) {
    this.toRegister.next(bool);
  }

  setAuthenticated(bool: boolean) {
    this.isAuthenticated.next(bool);
  }

  setUserName(username: string) {
    this.userName.next(username);
  }

  setRole(role: UserRole) {
    this.userName.next(UserRole[role]);
  }

  getRole() {
    return this.role;
  }

  setJWTToken(token: string) {
    this.jwtAccessToken.next(token);
  }

  setTopic(topic: string) {
    this.topicSubscription.next(topic);
  }

}
