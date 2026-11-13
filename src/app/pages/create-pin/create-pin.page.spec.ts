/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePinPage } from './create-pin.page';

describe('CreatePinPage', () => {
  let component: CreatePinPage;
  let fixture: ComponentFixture<CreatePinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatePinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
