import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}


  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip adding token for specific URLs
    if (this.isInBlockedList(request.url)) {
      return next.handle(request);
    }

    return next.handle(this.addToken(request)).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 403|| error.status === 403) {
          return this.handle401Error(request, next);
        } else if (error instanceof HttpErrorResponse && error.status === 402) {
          return this.handle402Error(error);
        } else if (error instanceof HttpErrorResponse && (error.status === 400 || error.status === 405)) {
          return this.handle402Error(error);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private isInBlockedList(url: string): boolean {
    const blockedUrls = [
      'http://127.0.0.1:8000/api/auth/login',
      'http://127.0.0.1:8000/api/auth/logout'
    ];
    return blockedUrls.includes(url);
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.currentAccessToken;
    return token 
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;
  }

  private handle400Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    this.showToast('Session expired. Please login again.');
    this.authService.cleanUpAfterLogout();
    return throwError(() => error);
  }

  private handle402Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    this.router.navigate(['/secure/secondary/plan']);
    return throwError(() => error);
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.getNewAccessToken2().pipe(
        switchMap((tokenResponse: any) => {
          if (tokenResponse?.token) {
            this.authService.storeAccessToken(tokenResponse.token);
            this.refreshTokenSubject.next(tokenResponse.token);
            return next.handle(this.addToken(request));
          }
          // If we couldn't get a new token, force logout
          this.authService.cleanUpAfterLogout();
          return throwError(() => new Error('Failed to refresh token'));
        }),
        catchError((error) => {
          this.authService.cleanUpAfterLogout();
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request));
        })
      );
    }
  }
}