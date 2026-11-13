/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { register } from 'swiper/element';
import Swiper from 'swiper';

register();
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>
  index: any = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  };
  isEnd: boolean = false;
  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  slideChanged(event: any) {
    this.index = this.swiper?.nativeElement.swiper.activeIndex;
    this.isEnd = this.swiper?.nativeElement.swiper.isEnd ?? false;
  }

  nextSlide() {
    this.swiper?.nativeElement.swiper.slideNext();
    if (this.isEnd == true) {
      this.onAuth();
    }
  }

  onAuth() {
    this.util.navigateToPage('/auth');
  }

}
