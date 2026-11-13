/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCoursesDetailsPage } from './my-courses-details.page';

describe('MyCoursesDetailsPage', () => {
  let component: MyCoursesDetailsPage;
  let fixture: ComponentFixture<MyCoursesDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyCoursesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
