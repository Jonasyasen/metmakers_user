/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccessModalPageRoutingModule } from './payment-success-modal-routing.module';

import { PaymentSuccessModalPage } from './payment-success-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSuccessModalPageRoutingModule
  ],
  declarations: [PaymentSuccessModalPage]
})
export class PaymentSuccessModalPageModule { }
