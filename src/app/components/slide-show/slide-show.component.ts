import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Navigation } from 'swiper';
import { Config } from '../../classes/Config';
import { Media } from '../../interfaces/media';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styles: [
  ]
})
export class SlideShowComponent implements OnInit {

  @Input() movies: Media[] = [];

  imagePath: String = Config.IMAGE_URL;
  videoPath: String = Config.VIDEO_URL;

  config: SwiperOptions = {
    slidesPerView: 1,
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
