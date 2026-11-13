/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlineCoursesPage } from './online-courses.page';

describe('OnlineCoursesPage', () => {
  let component: OnlineCoursesPage;
  let fixture: ComponentFixture<OnlineCoursesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OnlineCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
