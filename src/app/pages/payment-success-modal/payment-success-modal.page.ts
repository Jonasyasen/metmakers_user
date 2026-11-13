/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-success-modal',
  templateUrl: './payment-success-modal.page.html',
  styleUrls: ['./payment-success-modal.page.scss'],
})
export class PaymentSuccessModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onClose(type: any) {
    this.modalController.dismiss(type, type);
  }

}
