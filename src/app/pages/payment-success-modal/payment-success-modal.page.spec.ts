/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSuccessModalPage } from './payment-success-modal.page';

describe('PaymentSuccessModalPage', () => {
  let component: PaymentSuccessModalPage;
  let fixture: ComponentFixture<PaymentSuccessModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentSuccessModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
