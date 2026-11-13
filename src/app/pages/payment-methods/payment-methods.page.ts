/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { PaymentSuccessModalPage } from '../payment-success-modal/payment-success-modal.page';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {

  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  async onSuccess() {
    const modal = await this.modalController.create({
      component: PaymentSuccessModalPage,
      cssClass: 'success-modal',
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    await modal.present();
  }

}
