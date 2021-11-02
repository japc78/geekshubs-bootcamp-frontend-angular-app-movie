import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import SwiperCore, { SwiperOptions } from 'swiper';
import { Config } from '../../classes/Config';


@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styles: [
  ]
})
export class SlideShowComponent implements OnInit {

  @Input() movies: Movie[] = [];

  imagePath: String = Config.IMAGE_URL;

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
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
