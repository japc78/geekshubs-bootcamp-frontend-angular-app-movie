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

  imagePath: String = Config.IMAGE_URL;

  config: SwiperOptions = {
    slidesPerView: 'auto',
    navigation: true,
    pagination: { clickable: true },
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
