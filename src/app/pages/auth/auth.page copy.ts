
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventType, EventMessage } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
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
      this.msalService.loginPopup().subscribe((res) => {
      this.msalService.instance.setActiveAccount(res.account);
      console.log(res);

      // Prepare payload to send to the backend
      const payload = {
        account: res.account,
        idToken: res.idToken,
        accessToken: res.accessToken
      };

      // Send the payload to the backend API
      this.http.post('http://localhost:8000/api/auth/login/', payload)
        .subscribe(
        (response: any) => {
          console.log('Login API response:', response);
          // Handle the response as needed
        },
        (error) => {
          console.error('Error sending login data to backend:', error);
        }
        );
      });
    }
  
    logout() {
      this.msalService.logout();
    }





}
