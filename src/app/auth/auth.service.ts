import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi3C7bPXSmY-2PzfCbKUJYiP86iChej-4',
    {
     email:email,
     password:password,
     returnSecureToken:true
    })
    .pipe(
      catchError(errorResponse => {
      let error = 'An error occurred';
      if(!errorResponse.error || !errorResponse.error.error) {
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            error = 'Email already exists';
          }
      }
      return throwError(error);
    }
    )
    );
  }

  signin() {

  }
}
