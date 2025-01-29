import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRole} from '@core/models/UserRole';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private roleSubject: BehaviorSubject<UserRole>;
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor() {
    console.log("Control service constructor")
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.roleSubject = new BehaviorSubject(role ? UserRole[role as keyof typeof UserRole] : UserRole.Guest);
    this.isLoggedInSubject = new BehaviorSubject(isLoggedIn ? JSON.parse(isLoggedIn) : false);
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

  setIsLoggedIn(bool: boolean) {
    localStorage.setItem('isLoggedIn', JSON.stringify(bool));
    this.isLoggedInSubject.next(bool);
  }

  getIsLoggedIn(): Observable<boolean> {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    return this.isLoggedInSubject.asObservable()
  }

  setRole(role: UserRole) {
    localStorage.setItem('role', role.toString());
    this.roleSubject.next(role);
  }

  getRole(): Observable<UserRole> {
    // const roleAgain = this.roleSubject.getValue() ? UserRole[this.roleSubject.getValue() as keyof typeof UserRole] : UserRole.Guest;
    return this.roleSubject.asObservable();
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

  getUserName(): Observable<string> {
    return this.userName.asObservable();
  }

  setJWTToken(token: string) {
    this.jwtAccessToken.next(token);
  }

  setTopic(topic: string) {
    this.topicSubscription.next(topic);
  }

  cleanAll() {
    localStorage.clear()
  }
}
