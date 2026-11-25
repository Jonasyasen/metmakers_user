import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap, catchError, finalize } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentAccessToken = '';
  url = `${environment.apiBaseUrl}/auth/`;


  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }


  logout() {
    this.removeAPITOKEN2().subscribe(
      () => {
        this.cleanUpAfterLogout();
      },
      error => {
        console.error('Error during logout:', error);
        // Handle errors or perform additional actions as needed
      }
    );
  }
  


  getNewAccessToken2(): Observable<{ access_token: string; refresh_token: string }> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      this.cleanUpAfterLogout();
      return throwError(() => new Error('No refresh token available'));
    }
  
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log('Using refresh token:', refreshToken);
  
    return this.http.post<{ access_token: string; refresh_token: string }>(`${this.url}refresh-token/`, { refresh_token: refreshToken }, httpOptions).pipe(
      catchError(error => {
        this.cleanUpAfterLogout();
        return throwError(() => error);
      })
    );
  }
  
  removeAPITOKEN2(): Observable<any> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      console.debug('No refresh token found in localStorage.');
      return EMPTY;
    }
  
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    console.debug('Attempting to revoke token with refresh token:', refreshToken);
    return this.http.post(`${this.url}logout/`, { app: 'from ionic tabs' }, httpOptions).pipe(
      catchError(error => {
        console.error('Error revoking token:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        console.debug('Token revocation process finalized. Cleaning up after logout.');
        this.cleanUpAfterLogout();
      })
    );
  }


  storeAccessToken(accessToken: string) {
    this.currentAccessToken = accessToken;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  cleanUpAfterLogout() {
    this.currentAccessToken = '';
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    this.isAuthenticated.next('false');
    this.router.navigateByUrl('/auth', { replaceUrl: true });
  }


  // Load token on startup
  loadToken() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      this.currentAccessToken = token;
      this.isAuthenticated.next('true');
    } else {
      this.isAuthenticated.next('false');
    }
  }















  
/*

  removeAPITOKEN() {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (token) {
      const httpOptions = {
        withCredentials: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };

      return this.http.post(`${this.url}/logout`, { app: 'from ionic tabs' }, httpOptions).pipe(
        catchError(error => {
          console.error('Token revocation failed:', error);
          return throwError(error);
        }),
        finalize(() => {
          console.log('Logout process finalized');
        })
      );
    } else {
      return of(null);
    }
  }














*/


  // Clear tokens and navigate to login
 /*

  getNewAccessToken() {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (token) {
      const httpOptions = {
        withCredentials: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
      console.log('Using refresh token:', token);
      return this.http.post(`${this.url}/refresh-token/`, { app: 'from ionic tabs' }, httpOptions);
    } else {
      return of(null);
    }
  }









*/












  // Manually store a new access token



  
}





