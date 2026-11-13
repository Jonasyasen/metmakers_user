/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  passwordView: boolean = false;

  constructor(
    public util: UtilService,
    private msalService: MsalService
  ) { }

  ngOnInit() {
    // Remove automatic login here to allow MSAL to initialize properly.
    // This avoids calling loginRedirect() before MSAL is ready.
  }

  ngAfterViewInit() {
    // Optional: Auto-login after view initialization if desired.
    // Use a delay to ensure MSAL is fully initialized.
    // Uncomment the following block if you want to enable auto-login.
    /*
    setTimeout(() => {
      if (!this.msalService.instance.getAllAccounts().length) {
        this.msalService.loginRedirect();
      }
    }, 1000);
    */
  }

  // Trigger login via user action (e.g., button click)
  async login() {
    // Optionally, you can await the initialization if it hasn't been done already.
    if (!this.msalService.instance.getAllAccounts().length) {
      await this.msalService.instance.initialize();
    }
    this.msalService.loginRedirect();
  }
  

  logout() {
    this.msalService.logoutRedirect();
  }

  toggePassword() {
    
    this.passwordView = !this.passwordView;
  }

  onLogin() {
    this.util.navigateRoot('/tabs/');
  }

  onRegister() {
    this.util.navigateToPage('/register');
  }

  onReset() {
    this.util.navigateToPage('forgot-password');
  }
}
