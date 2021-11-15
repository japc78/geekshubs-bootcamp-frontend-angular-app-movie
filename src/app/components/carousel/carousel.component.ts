import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Navigation } from 'swiper';
import { Config } from '../../classes/Config';
import { Media } from '../../interfaces/media';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styles: [
  ]
})
export class CarouselComponent implements OnInit {

  @Input() items: Media[] = [];

  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: true,
    // width: 100,
    // loop: true,
    // slidesPerGroup:1,
    // slidesPerGroupAuto: true,
    // cssMode: true,

    // pagination: { clickable: true },
    // breakpoints: {
    //   '1024': {
    //     spaceBetween: 16,
    //   }
    // }
  };

  onSwiper(swiper:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
