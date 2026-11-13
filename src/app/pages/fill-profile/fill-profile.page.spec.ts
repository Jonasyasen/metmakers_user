/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FillProfilePage } from './fill-profile.page';

describe('FillProfilePage', () => {
  let component: FillProfilePage;
  let fixture: ComponentFixture<FillProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FillProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
