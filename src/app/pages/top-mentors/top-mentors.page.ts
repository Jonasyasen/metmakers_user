/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-top-mentors',
  templateUrl: './top-mentors.page.html',
  styleUrls: ['./top-mentors.page.scss'],
})
export class TopMentorsPage implements OnInit {

  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }
  onSearch() {
    this.util.navigateToPage('/search');
  }

  onMentorDetails(name: any, image: any) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        image: image
      }
    };
    this.util.navigateToPage('mentor-details', param);
  }

}
