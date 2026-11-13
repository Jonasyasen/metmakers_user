
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventType, EventMessage } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {
  // Flag to prevent multiple interactive requests
  loginInProgress = false;
  private msalSubscription: Subscription;

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient,
  private router: Router,

    private authService: AuthService
  ) {  this.initializeMsal();}

  ngOnInit() {/*
   
  */}

  ngOnDestroy() {
    if (this.msalSubscription) {
      this.msalSubscription.unsubscribe();
    }
  }


    private async initializeMsal() {
      await this.msalService.instance.initialize();
    }
  
    isLoggedIn(): boolean {
      return this.msalService.instance.getActiveAccount() != null;
    }
  
    login() {
      const request = {
        scopes: ['User.Read'] // Request Microsoft Graph permission
      };
    
      this.msalService.loginPopup(request).subscribe({
        next: (loginResponse) => {
          // Set the logged-in account as active
          this.msalService.instance.setActiveAccount(loginResponse.account);
          console.log('Login successful:', loginResponse);
    
          // Now acquire a token to access Microsoft Graph
          this.msalService.acquireTokenSilent(request).subscribe({
            next: (tokenResponse) => {
              console.log('Access token acquired:', tokenResponse.accessToken);
    
              // Send the access token to your backend
              const payload = {
                accessToken: tokenResponse.accessToken
              };
    
              this.http.post<{ access_token: string,refresh_token:string }>('http://localhost:8000/api/auth/login/', payload).subscribe({
                next: (response) => {
                  localStorage.setItem('access_token', response.access_token);
                  localStorage.setItem('refresh_token', response.refresh_token);
                 // console.log('Login API response:', response);
                  console.log('Access token stored:', response.access_token);
                  console.log('Refresh token stored:', response.refresh_token);
                  this.router.navigate(['tabs/home']);

                  
                },
                error: (error) => {
                  console.error('Error sending token to backend:', error);
                }
              });
            },
            error: (silentError) => {
              console.warn('Silent token acquisition failed. Trying popup...', silentError);
    
              // Fallback to popup if silent fails
              this.msalService.acquireTokenPopup(request).subscribe({
                next: (popupTokenResponse) => {
                  const payload = {
                    accessToken: popupTokenResponse.accessToken
                  };
    
                  this.http.post('http://localhost:8000/api/auth/login/', payload).subscribe({
                    next: (response) => {
                      console.log('Login API response (from popup):', response);
                      console.log('1' ,response)
                      
                    },
                    error: (error) => {
                      console.error('Error sending token to backend:', error);
                    }
                  });
                },
                error: (popupError) => {
                  console.error('Popup token acquisition failed:', popupError);
                }
              });
            }
          });
        },
        error: (loginError) => {
          console.error('Login failed:', loginError);
        }
      });
    }
    
  
    logout() {
     // this.msalService.logout();

      this.authService.logout();
    }





}
