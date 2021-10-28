import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import SwiperCore, { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styles: [
  ]
})
export class SlideShowComponent implements OnInit {

  @Input() movies: Movie[] = [];

  imagePath: String = 'https://image.tmdb.org/t/p/original/'

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
