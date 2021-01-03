import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router) {

  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi3C7bPXSmY-2PzfCbKUJYiP86iChej-4',
    {
     email:email,
     password:password,
     returnSecureToken:true
    })
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthetication (
          responseData.email,
          responseData.idToken,
          responseData.localId,
          +responseData.expiresIn
          );
      })
    );
  }

  signin(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi3C7bPXSmY-2PzfCbKUJYiP86iChej-4',
    {
     email:email,
     password:password,
     returnSecureToken:true
    })
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthetication (
          responseData.email,
          responseData.idToken,
          responseData.localId,
          +responseData.expiresIn
          );
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if( this.tokenExpirationTimer ) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
      let errorMessage = 'An error occurred';
      if(!errorResponse.error || !errorResponse.error.error) {
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS': {
            errorMessage = 'Email already exists';
            break;
          }
          case 'EMAIL_NOT_FOUND': {
            errorMessage = 'Email is not correct!';
            break;
          }
          case 'INVALID_ID_PASSWORD': {
            errorMessage = 'Password is not correct!';
            break;
          }
          }
      }
      return throwError(errorMessage);
    }

    private handleAuthetication(email: string, token:string, userId: string, expiresIn: number) {
      const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
      );
      const user = new User(email,
        userId,
        token,
        expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
      const userData : {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }

      const loadedUser = new User(
        userData.email,
         userData.id,
         userData._token,
         new Date(userData._tokenExpirationDate)
         );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.autoLogout(expirationDuration);
      }

    }
}
