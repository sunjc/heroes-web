import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/auth`, JSON.stringify({username: username, password: password}), httpOptions).pipe(
      tap(response => {
        if (response && response.token) {
          // login successful, store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: response.token}));
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError((err) => {
        console.error(err);
        return of(false)
      })
    );
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : '';
  }

  getToken(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.token : '';
  }

  getUsername(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.username : '';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    const token: String = this.getToken();
    return token && token.length > 0;
  }
}
