import { User } from './../models/user.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable, ObservableInput, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutInterval: any;
  obs!: ObservableInput<any>;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureTokens: true }
    )
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureTokens: true }
    )
  }

  formatUser(data: AuthResponseData) {
    const expirationdate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.idToken, data.localId, expirationdate);
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unkown error occurred, pleaste try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    // this.runTimeoutInterval(user);
  }

  // runTimeoutInterval(user: User) {
  //   const todaysDate = new Date().getTime();
  //   const expireationDate = user.expireDate.getTime();
  //   const timeInterval = expireationDate - todaysDate;
  //   this.timeoutInterval = setTimeout(() => {
  //     // logout function || refresh token
  //   }, timeInterval);
  // }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if(userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationdate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        userData.expirationdate
        );
        // this.runTimeoutInterval(user);
        return user;
    }
    return null;
  }

}
